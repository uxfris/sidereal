import fp from "fastify-plugin"
import { createBullBoard } from "@bull-board/api"
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter"
import { FastifyAdapter } from "@bull-board/fastify"
import { QueueName, getQueue } from "@workspace/queue"
import { env } from "../config/env"

/**
 * Mounts Bull Board at `/admin/queues` in dev for worker visibility. Skipped
 * entirely in production — no credentials configured yet, so don't expose it.
 */
export default fp(async (app) => {
  if (env.NODE_ENV === "production") return

  const serverAdapter = new FastifyAdapter()
  serverAdapter.setBasePath("/admin/queues")

  createBullBoard({
    queues: [new BullMQAdapter(getQueue(QueueName.Transcribe))],
    serverAdapter,
  })

  await app.register(serverAdapter.registerPlugin(), {
    prefix: "/admin/queues",
  })
})
