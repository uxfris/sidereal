import type { Job } from "bullmq"
import { prisma } from "@workspace/database"
import {
  QueueName,
  getQueue,
  type ImportBotTranscriptJobPayload,
} from "@workspace/queue"
import { logger } from "../logger"
import { saveRawTranscriptJson } from "../lib/s3-presign"
import {
  downloadTranscriptJson,
  getBotTranscriptDownloadUrl,
  getTranscriptDownloadUrlById,
  type RecallTranscriptParticipantBlock,
} from "../lib/recall"

interface FlatSegment {
  index: number
  speaker: string
  text: string
  startMs: number
  endMs: number
}

/**
 * Recall delivers transcripts as one block per participant, each containing
 * a flat list of words with relative-second timestamps. To match our
 * existing `TranscriptSegment` shape we:
 *
 *   1. group consecutive words from the same participant into utterances
 *      whenever there's a >1.5s gap between words, and
 *   2. concatenate them with single spaces.
 *
 * The result is then sorted globally by start time so analyze sees a
 * sensible chronological transcript.
 */
function flattenRecallTranscript(
  blocks: RecallTranscriptParticipantBlock[]
): FlatSegment[] {
  const SEGMENT_GAP_MS = 1500
  const tentative: Array<Omit<FlatSegment, "index">> = []

  for (const block of blocks) {
    const speaker =
      block.participant.name?.trim() || `Speaker ${block.participant.id ?? "?"}`
    let buffer: string[] = []
    let bufferStartMs: number | null = null
    let bufferEndMs: number | null = null

    const flush = () => {
      if (buffer.length === 0 || bufferStartMs == null || bufferEndMs == null) {
        return
      }
      tentative.push({
        speaker,
        text: buffer.join(" ").replace(/\s+/g, " ").trim(),
        startMs: Math.max(0, Math.round(bufferStartMs)),
        endMs: Math.max(0, Math.round(bufferEndMs)),
      })
      buffer = []
      bufferStartMs = null
      bufferEndMs = null
    }

    for (const word of block.words) {
      const wordStartMs = (word.start_timestamp.relative ?? 0) * 1000
      const wordEndMs =
        (word.end_timestamp?.relative ?? word.start_timestamp.relative ?? 0) *
        1000

      if (
        buffer.length > 0 &&
        bufferEndMs != null &&
        wordStartMs - bufferEndMs > SEGMENT_GAP_MS
      ) {
        flush()
      }

      buffer.push(word.text)
      if (bufferStartMs == null) bufferStartMs = wordStartMs
      bufferEndMs = wordEndMs
    }
    flush()
  }

  // Sort globally so consumers see a chronological transcript even when
  // Recall returns one block per speaker.
  tentative.sort((a, b) => a.startMs - b.startMs || a.endMs - b.endMs)

  return tentative.map((segment, index) => ({ index, ...segment }))
}

function maxEndMs(segments: FlatSegment[]): number {
  let max = 0
  for (const segment of segments) {
    if (segment.endMs > max) max = segment.endMs
  }
  return max
}

export async function importBotTranscriptHandler(
  job: Job<ImportBotTranscriptJobPayload>
): Promise<{ meetingId: string }> {
  const {
    meetingId,
    workspaceId,
    userId,
    externalBotId,
    transcriptId,
    traceId,
  } = job.data
  const log = logger.child({
    queue: QueueName.ImportBotTranscript,
    jobId: job.id,
    meetingId,
    workspaceId,
    userId,
    externalBotId,
    transcriptId,
    traceId,
  })

  log.info("import-bot-transcript job received")

  try {
    const meeting = await prisma.meeting.findUnique({
      where: { id: meetingId },
    })
    if (!meeting) {
      log.warn("meeting not found; skipping")
      return { meetingId }
    }
    // Idempotent: only run if the bot is still in SCHEDULED state. Re-runs
    // (e.g. webhook replay) are dropped silently.
    if (meeting.status !== "SCHEDULED") {
      log.warn(
        { status: meeting.status },
        "meeting not in SCHEDULED state; skipping"
      )
      return { meetingId }
    }

    await prisma.processingEvent.create({
      data: {
        meetingId,
        stage: "TRANSCRIBE",
        status: "STARTED",
        message: "importing diarized transcript from Recall",
      },
    })

    const startedAt = Date.now()
    const downloadUrl = transcriptId
      ? await getTranscriptDownloadUrlById(transcriptId)
      : (await getBotTranscriptDownloadUrl(externalBotId)).downloadUrl
    const transcriptJson = await downloadTranscriptJson(downloadUrl)
    const segments = flattenRecallTranscript(transcriptJson)
    const durationMs = Date.now() - startedAt

    const transcriptBackupKey = await saveRawTranscriptJson({
      meetingId,
      payload: { source: "recall", transcript: transcriptJson },
    })

    const inferredLanguage =
      transcriptJson.find((b) => b.language_code)?.language_code ?? null

    await prisma.$transaction(async (tx) => {
      await tx.transcriptSegment.deleteMany({ where: { meetingId } })
      if (segments.length > 0) {
        await tx.transcriptSegment.createMany({
          data: segments.map((segment) => ({
            meetingId,
            index: segment.index,
            speaker: segment.speaker,
            startMs: segment.startMs,
            endMs: segment.endMs,
            text: segment.text,
          })),
        })
      }

      await tx.meeting.update({
        where: { id: meetingId },
        data: {
          status: "TRANSCRIBED",
          durationSeconds: Math.round(maxEndMs(segments) / 1000) || null,
          language: inferredLanguage,
        },
      })
    })

    await prisma.processingEvent.create({
      data: {
        meetingId,
        stage: "TRANSCRIBE",
        status: "SUCCEEDED",
        message: `imported ${segments.length} segments in ${Math.round(
          durationMs / 1000
        )}s`,
        metadata: {
          source: "recall",
          externalBotId,
          transcriptId: transcriptId ?? null,
          transcriptBackupKey,
          segmentCount: segments.length,
          durationMs,
        },
      },
    })

    // Skip transcribe + diarize stages — Recall has already done both.
    await getQueue(QueueName.Analyze).add(
      "analyze",
      { meetingId, workspaceId, userId, traceId },
      { jobId: `analyze-${meetingId}` }
    )

    log.info(
      { durationMs, segmentCount: segments.length },
      "import-bot-transcript completed"
    )
    return { meetingId }
  } catch (err) {
    log.error({ err }, "import-bot-transcript job failed")

    await prisma.meeting
      .update({ where: { id: meetingId }, data: { status: "FAILED" } })
      .catch(() => {})

    await prisma.processingEvent
      .create({
        data: {
          meetingId,
          stage: "TRANSCRIBE",
          status: "FAILED",
          message: (err as Error).message,
          metadata: {
            error: (err as Error).message,
            source: "recall",
            externalBotId,
          },
        },
      })
      .catch(() => {})

    return { meetingId }
  }
}
