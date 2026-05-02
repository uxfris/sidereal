import { FastifyInstance } from "fastify"
import z from "zod"

const healthResponseSchema = z.object({
  status: z.string(),
  service: z.string(),
  timestamp: z.string().datetime(),
})

export async function healthRoute(app: FastifyInstance) {
  app.get(
    "/health",
    {
      schema: {
        tags: ["System"],
        summary: "Health check",
        response: {
          200: healthResponseSchema,
        },
      },
    },
    async () => {
      return {
        status: "ok",
        service: "lume-api",
        timestamp: new Date().toISOString(),
      }
    }
  )
}
