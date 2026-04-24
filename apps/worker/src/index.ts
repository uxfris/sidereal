import "dotenv/config"
import {
  QueueName,
  closeAllQueues,
  closeRedisConnection,
  createWorker,
} from "@workspace/queue"
import { logger } from "./logger"
import { transcribeHandler } from "./handlers/transcribe"

const transcribeWorker = createWorker(QueueName.Transcribe, transcribeHandler)

transcribeWorker.on("ready", () => {
  logger.info({ queue: QueueName.Transcribe }, "worker ready")
})

transcribeWorker.on("failed", (job, err) => {
  logger.error(
    { queue: QueueName.Transcribe, jobId: job?.id, err },
    "job failed after retries"
  )
})

logger.info("worker online")

async function shutdown(signal: string) {
  logger.info({ signal }, "shutting down worker")
  try {
    await transcribeWorker.close()
    await closeAllQueues()
    await closeRedisConnection()
  } catch (err) {
    logger.error({ err }, "error during shutdown")
  } finally {
    process.exit(0)
  }
}

process.on("SIGINT", () => void shutdown("SIGINT"))
process.on("SIGTERM", () => void shutdown("SIGTERM"))
