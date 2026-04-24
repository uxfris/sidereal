import {
  Queue,
  Worker,
  type JobsOptions,
  type Processor,
  type QueueOptions,
  type WorkerOptions,
} from "bullmq"
import { getRedisConnection } from "./connection"
import type { JobNameFor, JobPayloadMap, QueueName } from "./jobs"

const queueCache = new Map<QueueName, Queue>()

/**
 * Conservative defaults tuned for expensive, non-idempotent jobs (Whisper,
 * OpenAI). Override via `getQueue(name, { defaultJobOptions })` for cheaper
 * queues (e.g. embeddings) that can afford more attempts.
 */
export const CONSERVATIVE_DEFAULT_JOB_OPTIONS: JobsOptions = {
  attempts: 2,
  backoff: { type: "exponential", delay: 60_000 },
  removeOnComplete: { age: 24 * 3600, count: 1000 },
  removeOnFail: { age: 7 * 24 * 3600 },
}

export interface GetQueueOptions {
  defaultJobOptions?: JobsOptions
}

/**
 * Returns a (cached) BullMQ queue for the given queue name. Options only
 * take effect on the first call per queue name.
 */
export function getQueue<Q extends QueueName>(
  name: Q,
  options: GetQueueOptions = {}
): Queue<JobPayloadMap[Q], unknown, JobNameFor<Q>> {
  const existing = queueCache.get(name)
  if (existing)
    return existing as Queue<JobPayloadMap[Q], unknown, JobNameFor<Q>>

  const queueOptions: QueueOptions = {
    connection: getRedisConnection(),
    defaultJobOptions:
      options.defaultJobOptions ?? CONSERVATIVE_DEFAULT_JOB_OPTIONS,
  }

  const queue = new Queue<JobPayloadMap[Q], unknown, JobNameFor<Q>>(
    name,
    queueOptions
  )

  queueCache.set(name, queue as Queue)
  return queue
}

/**
 * Creates a typed BullMQ worker. Caller is responsible for keeping the
 * returned worker alive (hold the reference in `apps/worker`).
 */
export function createWorker<Q extends QueueName>(
  name: Q,
  processor: Processor<JobPayloadMap[Q], unknown, JobNameFor<Q>>,
  options?: Partial<Omit<WorkerOptions, "connection">>
): Worker<JobPayloadMap[Q], unknown, JobNameFor<Q>> {
  return new Worker<JobPayloadMap[Q], unknown, JobNameFor<Q>>(name, processor, {
    connection: getRedisConnection(),
    concurrency: 2,
    ...options,
  })
}

export async function closeAllQueues(): Promise<void> {
  await Promise.all(Array.from(queueCache.values()).map((q) => q.close()))
  queueCache.clear()
}
