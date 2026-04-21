import { createBullBoard } from "@bull-board/api";
import { FastifyAdapter } from "@bull-board/fastify";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { getIngestionQueue } from "../queues/ingestion.queue";
import { FastifyInstance } from "fastify";

export async function registerBullBoard(app: FastifyInstance) {
    const queue = getIngestionQueue();
    const serverAdapter = new FastifyAdapter();

    serverAdapter.setBasePath("/admin/queues");

    createBullBoard({
        queues: [new BullMQAdapter(queue)],
        serverAdapter,
    });

    await app.register(serverAdapter.registerPlugin(), {
        prefix: "/admin/queues",
    });
}