import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import * as meetingsService from "./meetings.service"
import {
  getConversationParamsSchema,
  getConversationResponseSchema,
  meetingErrorSchema,
} from "./meetings.schema"
import { toConversationDTO } from "./meetings.presenter"

export const meetingsRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/:id/conversation",
    {
      preHandler: [app.verifySession, app.requireWorkspace],
      schema: {
        tags: ["Meetings"],
        summary: "Get diarized conversation transcript for a meeting",
        params: getConversationParamsSchema,
        response: {
          200: getConversationResponseSchema,
          404: meetingErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const conversation = await meetingsService.getConversation({
        meetingId: request.params.id,
        workspaceId: request.workspace!.id,
      })

      if (!conversation) {
        return reply.status(404).send({
          error: "MEETING_NOT_FOUND",
        })
      }

      return reply.status(200).send(toConversationDTO(conversation))
    }
  )
}
