import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { searchQuerySchema, searchResponseSchema } from "./search.schema"
import { searchMeetings } from "./search.service"

export const searchRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/",
    {
      preHandler: [app.verifySession, app.requireWorkspace],
      schema: {
        tags: ["Search"],
        summary: "Hybrid semantic + keyword meeting search",
        querystring: searchQuerySchema,
        response: {
          200: searchResponseSchema,
        },
      },
    },
    async (request) => {
      const results = await searchMeetings({
        workspaceId: request.workspace!.id,
        query: request.query.q,
        limit: request.query.limit,
      })

      return { results }
    }
  )
}
