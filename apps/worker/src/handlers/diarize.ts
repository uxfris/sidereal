import type { Job } from "bullmq"
import { prisma } from "@workspace/database"
import { QueueName, getQueue, type DiarizeJobPayload } from "@workspace/queue"
import { logger } from "../logger"
import { createPresignedAudioDownload } from "../lib/s3-presign"
import { diarizeAudio, type DiarizeWindow } from "../lib/pyannote"

function inferSpeakerFromWindows(
  segmentMidpointMs: number,
  windows: DiarizeWindow[]
): string | null {
  const matching = windows.find(
    (window) => segmentMidpointMs >= window.startMs && segmentMidpointMs <= window.endMs
  )
  return matching?.speaker ?? null
}

function buildUnknownSpeakerAllocator() {
  const map = new Map<number, string>()
  let next = 0
  return (segmentIndex: number): string => {
    const bucket = Math.floor(segmentIndex / 5)
    const existing = map.get(bucket)
    if (existing) return existing
    const label = `Speaker ${String.fromCharCode("A".charCodeAt(0) + next)}`
    next += 1
    map.set(bucket, label)
    return label
  }
}

export async function diarizeHandler(
  job: Job<DiarizeJobPayload>
): Promise<{ meetingId: string }> {
  const { meetingId, workspaceId, userId, audioKey, traceId } = job.data
  const log = logger.child({
    queue: QueueName.Diarize,
    jobId: job.id,
    meetingId,
    workspaceId,
    userId,
    traceId,
  })

  log.info("diarize job received")

  try {
    await prisma.processingEvent.create({
      data: {
        meetingId,
        stage: "DIARIZE",
        status: "STARTED",
      },
    })

    const audioUrl = await createPresignedAudioDownload(audioKey)
    const windows = await diarizeAudio(audioUrl)
    const segments = await prisma.transcriptSegment.findMany({
      where: { meetingId },
      orderBy: { index: "asc" },
    })
    const fallbackSpeaker = buildUnknownSpeakerAllocator()

    for (const segment of segments) {
      const midpoint = Math.round((segment.startMs + segment.endMs) / 2)
      const inferred = inferSpeakerFromWindows(midpoint, windows)
      await prisma.transcriptSegment.update({
        where: { id: segment.id },
        data: { speaker: inferred ?? fallbackSpeaker(segment.index) },
      })
    }

    await prisma.processingEvent.create({
      data: {
        meetingId,
        stage: "DIARIZE",
        status: "SUCCEEDED",
        metadata: {
          diarizationWindowCount: windows.length,
          transcriptSegmentCount: segments.length,
        },
      },
    })

    await getQueue(QueueName.Analyze).add(
      "analyze",
      { meetingId, workspaceId, userId, traceId },
      { jobId: `analyze-${meetingId}` }
    )

    log.info("diarize job completed")
    return { meetingId }
  } catch (err) {
    await prisma.meeting
      .update({ where: { id: meetingId }, data: { status: "FAILED" } })
      .catch(() => {})

    log.error({ err }, "diarize job failed")

    await prisma.processingEvent
      .create({
        data: {
          meetingId,
          stage: "DIARIZE",
          status: "FAILED",
          message: (err as Error).message,
          metadata: { error: (err as Error).message },
        },
      })
      .catch(() => {})

    // Avoid automatic retries for heavy diarization requests.
    return { meetingId }
  }
}
