import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { getMeResponseSchema } from "./users.schema"
import * as usersService from "./users.service"

export const userRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/me",
    {
      preHandler: [app.verifySession],
      schema: {
        tags: ["Users"],
        summary: "Get current user profile and workspace memberships",
        response: {
          200: getMeResponseSchema,
        },
      },
    },
    async (request) => {
      return usersService.getMe({
        user: request.user!,
        workspaceIdHeader: request.headers["x-workspace-id"],
      })
    },
  )
}