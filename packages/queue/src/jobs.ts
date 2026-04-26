/**
 * Central registry of queue names + their job payload types.
 *
 * Add a new queue by:
 *   1. Adding a key under `QueueName`.
 *   2. Adding the payload type to `JobPayloadMap`.
 *   3. Creating the queue via `getQueue(QueueName.X)` in the API.
 *   4. Registering a worker via `createWorker(QueueName.X, handler)` in apps/worker.
 */
export const QueueName = {
  Transcribe: "transcribe",
  Diarize: "diarize",
} as const

export type QueueName = (typeof QueueName)[keyof typeof QueueName]

export interface TranscribeJobPayload {
  meetingId: string
  workspaceId: string
  userId: string
  audioKey: string
  /** Forwarded from the originating API request so we can correlate logs. */
  traceId?: string
}

export interface DiarizeJobPayload {
  meetingId: string
  workspaceId: string
  userId: string
  audioKey: string
  traceId?: string
}

export interface JobPayloadMap {
  [QueueName.Transcribe]: TranscribeJobPayload
  [QueueName.Diarize]: DiarizeJobPayload
}

export type JobNameFor<Q extends QueueName> =
  Q extends typeof QueueName.Transcribe
    ? "transcribe"
    : Q extends typeof QueueName.Diarize
      ? "diarize"
      : never
