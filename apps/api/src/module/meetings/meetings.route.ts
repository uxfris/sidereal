import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import * as meetingsService from "./meetings.service"
import {
  getConversationParamsSchema,
  getConversationResponseSchema,
  getMeetingParamsSchema,
  listMeetingsQuerySchema,
  listMeetingsResponseSchema,
  meetingErrorSchema,
  meetingSchema,
  patchMeetingBodySchema,
  patchMeetingParamsSchema,
} from "./meetings.schema"

export const meetingsRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/",
    {
      preHandler: [app.verifySession, app.requireWorkspace],
      schema: {
        tags: ["Meetings"],
        summary: "List meetings in current workspace (cursor pagination)",
        querystring: listMeetingsQuerySchema,
        response: {
          200: listMeetingsResponseSchema,
          400: meetingErrorSchema,
        },
      },
    },
    async (request, reply) => {
      try {
        return await meetingsService.listMeetings({
          workspaceId: request.workspace!.id,
          cursor: request.query.cursor,
          limit: request.query.limit,
        })
      } catch (err) {
        if ((err as Error).message === "INVALID_CURSOR") {
          return reply.status(400).send({
            error: "INVALID_CURSOR",
            message: "Invalid or expired cursor.",
          })
        }
        throw err
      }
    }
  )

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

      return reply.status(200).send(conversation)
    }
  )

  app.get(
    "/:id",
    {
      preHandler: [app.verifySession, app.requireWorkspace],
      schema: {
        tags: ["Meetings"],
        summary: "Get a single meeting for the dashboard / detail header",
        params: getMeetingParamsSchema,
        response: {
          200: meetingSchema,
          404: meetingErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const meeting = await meetingsService.getMeetingById({
        meetingId: request.params.id,
        workspaceId: request.workspace!.id,
      })

      if (!meeting) {
        return reply.status(404).send({ error: "MEETING_NOT_FOUND" })
      }

      return reply.status(200).send(meeting)
    }
  )

  app.patch(
    "/:id",
    {
      preHandler: [app.verifySession, app.requireWorkspace],
      schema: {
        tags: ["Meetings"],
        summary: "Update meeting title and sharing flags",
        params: patchMeetingParamsSchema,
        body: patchMeetingBodySchema,
        response: {
          204: z.undefined(),
          404: meetingErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const result = await meetingsService.patchMeeting({
        meetingId: request.params.id,
        workspaceId: request.workspace!.id,
        title: request.body.title,
        isShared: request.body.isShared,
      })

      if (!result.ok) {
        return reply.status(404).send({ error: "MEETING_NOT_FOUND" })
      }

      return reply.status(204).send()
    }
  )

  app.delete(
    "/:id",
    {
      preHandler: [app.verifySession, app.requireWorkspace],
      schema: {
        tags: ["Meetings"],
        summary: "Soft-delete a meeting",
        params: getMeetingParamsSchema,
        response: {
          204: z.undefined(),
          404: meetingErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const result = await meetingsService.deleteMeeting({
        meetingId: request.params.id,
        workspaceId: request.workspace!.id,
      })

      if (!result.ok) {
        return reply.status(404).send({ error: "MEETING_NOT_FOUND" })
      }

      return reply.status(204).send()
    }
  )
}
