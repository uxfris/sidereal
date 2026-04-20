import { Queue } from "bullmq";
import { createRedisConnection } from "./connection";

export const INGESTION_QUEUE_NAME = "ingestion";

export function createIngestionQueue(redisUrl: string) {
    const connection = createRedisConnection(redisUrl);

    return new Queue(INGESTION_QUEUE_NAME, {
        connection,
    });
}