import type { Job } from "bullmq"
import { prisma } from "@workspace/database"
import { type DiarizeJobPayload, QueueName } from "@workspace/queue"
import { logger } from "../logger"

/**
 * Phase 3 placeholder consumer.
 * Phase 4 will replace this with a real pyannote call + segment speaker merge.
 */
export async function diarizeHandler(
  job: Job<DiarizeJobPayload>
): Promise<{ meetingId: string }> {
  const { meetingId, workspaceId, userId, traceId } = job.data
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
        message: "phase 3 stub started",
      },
    })

    await prisma.processingEvent.create({
      data: {
        meetingId,
        stage: "DIARIZE",
        status: "SUCCEEDED",
        message: "phase 3 stub completed (real diarization lands in phase 4)",
      },
    })

    log.info("diarize job completed")
    return { meetingId }
  } catch (err) {
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

    return { meetingId }
  }
}
