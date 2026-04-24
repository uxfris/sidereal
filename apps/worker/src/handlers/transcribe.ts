import type { Job } from "bullmq"
import { prisma } from "@workspace/database"
import type { TranscribeJobPayload } from "@workspace/queue"
import { logger } from "../logger"

/**
 * Phase 2 stub. Real Whisper integration lands in phase 3.
 *
 * State transitions:
 *   UPLOADED → TRANSCRIBING → TRANSCRIBED
 *   On any failure: → FAILED (via compare-and-swap) and emit FAILED event.
 *
 * On error we SWALLOW (return rather than throw) so BullMQ doesn't retry the
 * (future) expensive Whisper call automatically. Retries, when we want them,
 * should be explicit via re-enqueue.
 */
export async function transcribeHandler(
  job: Job<TranscribeJobPayload>
): Promise<{ meetingId: string }> {
  const { meetingId, audioKey, traceId } = job.data
  const log = logger.child({ jobId: job.id, meetingId, audioKey, traceId })

  log.info("transcribe job received")

  try {
    // CAS: only start if the meeting is actually UPLOADED. Prevents picking up
    // duplicate/retry jobs that got past the queue-level dedupe.
    const startResult = await prisma.meeting.updateMany({
      where: { id: meetingId, status: "UPLOADED" },
      data: { status: "TRANSCRIBING" },
    })

    if (startResult.count === 0) {
      log.warn("meeting not in UPLOADED state; skipping")
      return { meetingId }
    }

    await prisma.processingEvent.create({
      data: {
        meetingId,
        stage: "TRANSCRIBE",
        status: "STARTED",
      },
    })

    const startedAt = Date.now()
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const durationMs = Date.now() - startedAt

    await prisma.meeting.update({
      where: { id: meetingId },
      data: { status: "TRANSCRIBED" },
    })

    await prisma.processingEvent.create({
      data: {
        meetingId,
        stage: "TRANSCRIBE",
        status: "SUCCEEDED",
        message: "stubbed transcription completed",
        metadata: { durationMs, stub: true },
      },
    })

    log.info({ durationMs }, "transcribe job completed")
    return { meetingId }
  } catch (err) {
    log.error({ err }, "transcribe job failed")

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
          metadata: { error: (err as Error).message },
        },
      })
      .catch(() => {})

    return { meetingId }
  }
}
