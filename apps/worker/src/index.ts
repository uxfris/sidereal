import { Worker } from "bullmq";
import { processIngestionJob } from "./jobs/process-ingestion.job";
import { INGESTION_QUEUE_NAME, createRedisConnection, createIngestionQueue } from "@workspace/queue";

const connection = createRedisConnection(process.env.REDIS_URL!);
const queue = createIngestionQueue(process.env.REDIS_URL!);


async function bootstrap() {
    const worker = new Worker(
        INGESTION_QUEUE_NAME,
        async (job) => {
            await processIngestionJob(job.data);
        },
        {
            connection,
            concurrency: 2,
        }
    );

    worker.on("completed", (job) => {
        console.log(`Job completed: ${job.id}`);
    });

    worker.on("failed", (job, err) => {
        console.error(`Job failed: ${job?.id}`, err);
    });

    process.on("SIGINT", async () => {
        await worker.close();
        await queue.close();
        await connection.quit();
        process.exit(0);
    });
}

bootstrap().catch((err) => {
    console.error(err);
    process.exit(1);
});