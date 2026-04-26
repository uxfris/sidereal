import "dotenv/config"
import "./config/env"
import {
  QueueName,
  closeAllQueues,
  closeRedisConnection,
  createWorker,
} from "@workspace/queue"
import { logger } from "./logger"
import { transcribeHandler } from "./handlers/transcribe"
import { diarizeHandler } from "./handlers/diarize"

const transcribeWorker = createWorker(QueueName.Transcribe, transcribeHandler)
const diarizeWorker = createWorker(QueueName.Diarize, diarizeHandler)

transcribeWorker.on("ready", () => {
  logger.info({ queue: QueueName.Transcribe }, "worker ready")
})
diarizeWorker.on("ready", () => {
  logger.info({ queue: QueueName.Diarize }, "worker ready")
})

transcribeWorker.on("failed", (job, err) => {
  logger.error(
    { queue: QueueName.Transcribe, jobId: job?.id, err },
    "job failed after retries"
  )
})
diarizeWorker.on("failed", (job, err) => {
  logger.error(
    { queue: QueueName.Diarize, jobId: job?.id, err },
    "job failed after retries"
  )
})

logger.info("worker online")

async function shutdown(signal: string) {
  logger.info({ signal }, "shutting down worker")
  try {
    await transcribeWorker.close()
    await diarizeWorker.close()
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
