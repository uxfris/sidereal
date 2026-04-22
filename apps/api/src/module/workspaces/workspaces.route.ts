import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { z } from "zod"
import { ensurePersonalWorkspace } from "@workspace/auth"
import * as workspacesService from "./workspaces.service"

const inviteRoleSchema = z.enum(["ADMIN", "MEMBER", "GUEST"])

const workspaceListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  role: z.enum(["OWNER", "ADMIN", "MEMBER", "GUEST"]),
  joinedAt: z.string(),
})

export const workspacesRoutes: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/",
    {
      preHandler: [app.verifySession],
      schema: {
        tags: ["Workspaces"],
        summary: "List workspaces the current user belongs to",
        response: {
          200: z.object({
            workspaces: z.array(workspaceListItemSchema),
          }),
        },
      },
    },
    async (request) => {
      await ensurePersonalWorkspace({
        id: request.user!.id,
        name: request.user!.name,
        email: request.user!.email,
      })

      const rows = await workspacesService.listWorkspacesForUser(
        request.user!.id
      )

      return {
        workspaces: rows.map((m) => ({
          id: m.workspace.id,
          name: m.workspace.name,
          slug: m.workspace.slug,
          role: m.role,
          joinedAt: m.joinedAt.toISOString(),
        })),
      }
    }
  )

  app.post(
    "/",
    {
      preHandler: [app.verifySession],
      schema: {
        tags: ["Workspaces"],
        summary: "Create a new workspace",
        body: z.object({
          name: z.string().min(1).max(120),
        }),
      },
    },
    async (request, reply) => {
      const workspace = await workspacesService.createWorkspace(
        request.user!.id,
        request.body.name
      )
      return reply.status(201).send({
        id: workspace.id,
        name: workspace.name,
        slug: workspace.slug,
      })
    }
  )

  app.patch(
    "/:id",
    {
      preHandler: [
        app.verifySession,
        app.requireWorkspaceFromParams,
        app.requireRole(["OWNER", "ADMIN"]),
      ],
      schema: {
        tags: ["Workspaces"],
        summary: "Update workspace name",
        params: z.object({ id: z.string().min(1) }),
        body: z.object({
          name: z.string().min(1).max(120),
        }),
      },
    },
    async (request, reply) => {
      const result = await workspacesService.updateWorkspaceName(
        request.params.id,
        request.user!.id,
        request.body.name
      )

      if (!result.ok) {
        if (result.error === "NOT_FOUND") {
          return reply.status(404).send({ error: "WORKSPACE_NOT_FOUND" })
        }
        return reply.status(403).send({ error: "FORBIDDEN" })
      }

      return reply.status(200).send({
        id: result.workspace.id,
        name: result.workspace.name,
        slug: result.workspace.slug,
      })
    }
  )

  app.post(
    "/:id/invitations",
    {
      preHandler: [
        app.verifySession,
        app.requireWorkspaceFromParams,
        app.requireRole(["OWNER", "ADMIN"]),
      ],
      schema: {
        tags: ["Workspaces"],
        summary: "Create or refresh a workspace invitation",
        params: z.object({ id: z.string().min(1) }),
        body: z.object({
          email: z.email(),
          role: inviteRoleSchema.default("MEMBER"),
        }),
      },
    },
    async (request, reply) => {
      const result = await workspacesService.createOrRefreshInvitation(
        request.params.id,
        request.user!.id,
        request.user!.email,
        request.body.email,
        request.body.role
      )

      if (!result.ok) {
        const status =
          result.error === "NOT_FOUND"
            ? 404
            : result.error === "FORBIDDEN"
              ? 403
              : result.error === "SELF_INVITE"
                ? 400
                : 409

        return reply.status(status).send({ error: result.error })
      }

      return reply.status(201).send({
        invitationId: result.invitationId,
        token: result.token,
        expiresAt: result.expiresAt.toISOString(),
      })
    }
  )
}

export const invitationsAcceptRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/:token/accept",
    {
      preHandler: [app.verifySession],
      schema: {
        tags: ["Invitations"],
        summary: "Accept a workspace invitation",
        params: z.object({
          token: z.string().min(1),
        }),
      },
    },
    async (request, reply) => {
      const result = await workspacesService.acceptInvitation(
        request.user!.id,
        request.user!.email,
        request.params.token
      )

      if (!result.ok) {
        const status =
          result.error === "INVITE_NOT_FOUND"
            ? 404
            : result.error === "EMAIL_MISMATCH"
              ? 403
              : result.error === "INVITE_REVOKED" ||
                  result.error === "INVITE_EXPIRED" ||
                  result.error === "INVITE_ALREADY_USED"
                ? 410
                : 400

        return reply.status(status).send({ error: result.error })
      }

      return reply.status(200).send({
        workspaceId: result.workspaceId,
        role: result.role,
      })
    }
  )
}
