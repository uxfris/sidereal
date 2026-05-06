import IORedis, { type RedisOptions } from "ioredis"

let sharedConnection: IORedis | undefined

export function getRedisConnection(): IORedis {
  if (sharedConnection) return sharedConnection

  const url = process.env.REDIS_URL

  if (!url) {
    throw new Error(
      "REDIS_URL is not set. Queue connections require a Redis instance."
    )
  }

  const options: RedisOptions = {
    // BullMQ requires this for blocking commands.
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  }

  sharedConnection = new IORedis(url, options)
  return sharedConnection
}

export async function closeRedisConnection(): Promise<void> {
  if (sharedConnection) {
    await sharedConnection.quit()
    sharedConnection = undefined
  }
}
