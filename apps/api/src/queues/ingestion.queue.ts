import { Queue } from "bullmq";
import { createIngestionQueue } from "@workspace/queue";

let ingestionQueue: Queue | null = null;


export function getIngestionQueue() {
    if (!ingestionQueue) {
        ingestionQueue = createIngestionQueue(process.env.REDIS_URL!)
    }

    return ingestionQueue;
}