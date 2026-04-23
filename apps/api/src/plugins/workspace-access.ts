import fp from "fastify-plugin"
import type { FastifyReply, FastifyRequest, preHandlerAsyncHookHandler } from "fastify"
import { ensurePersonalWorkspace } from "@workspace/auth"
import { prisma } from "@workspace/database"
import type { WorkspaceRole } from "@workspace/database"

const WORKSPACE_HEADER = "x-workspace-id"

export default fp(async (app) => {
  app.decorate("requireWorkspace", async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user?.id) {
      return reply.status(401).send({ error: "UNAUTHORIZED" })
    }

    await ensurePersonalWorkspace({
      id: request.user.id,
      name: request.user.name,
      email: request.user.email,
    })

    const workspaceIdHeader = request.headers[WORKSPACE_HEADER]
    const workspaceId =
      typeof workspaceIdHeader === "string"
        ? workspaceIdHeader
        : Array.isArray(workspaceIdHeader)
          ? workspaceIdHeader[0]
          : undefined

    const membership = workspaceId
      ? await prisma.workspaceMember.findFirst({
          where: {
            userId: request.user.id,
            workspaceId,
          },
          include: {
            workspace: true,
          },
        })
      : await prisma.workspaceMember.findFirst({
          where: {
            userId: request.user.id,
          },
          include: {
            workspace: true,
          },
          orderBy: {
            joinedAt: "asc",
          },
        })

    if (!membership) {
      return reply.status(403).send({
        error: "WORKSPACE_ACCESS_DENIED",
        message: workspaceId
          ? "You are not a member of this workspace."
          : "No workspace membership found for this user.",
      })
    }

    request.workspace = membership.workspace
    request.membership = membership
  })

  /** Resolves `request.workspace` / `request.membership` from `:id` route param (not `x-workspace-id`). */
  app.decorate(
    "requireWorkspaceFromParams",
    async (request: FastifyRequest, reply: FastifyReply) => {
      if (!request.user?.id) {
        return reply.status(401).send({ error: "UNAUTHORIZED" })
      }

      await ensurePersonalWorkspace({
        id: request.user.id,
        name: request.user.name,
        email: request.user.email,
      })

      const workspaceId = (request.params as { id?: string }).id
      if (!workspaceId) {
        return reply.status(400).send({ error: "WORKSPACE_ID_REQUIRED" })
      }

      const membership = await prisma.workspaceMember.findFirst({
        where: {
          userId: request.user.id,
          workspaceId,
        },
        include: {
          workspace: true,
        },
      })

      if (!membership) {
        return reply.status(404).send({
          error: "WORKSPACE_NOT_FOUND",
          message: "Workspace not found or you are not a member.",
        })
      }

      request.workspace = membership.workspace
      request.membership = membership
    },
  )

  app.decorate(
    "requireRole",
    (roles: WorkspaceRole | WorkspaceRole[]): preHandlerAsyncHookHandler =>
      async (request: FastifyRequest, reply: FastifyReply) => {
        const roleList = Array.isArray(roles) ? roles : [roles]

        if (!request.membership) {
          return reply.status(500).send({
            error: "WORKSPACE_CONTEXT_MISSING",
            message: "requireWorkspace must run before requireRole.",
          })
        }

        if (!roleList.includes(request.membership.role)) {
          return reply.status(403).send({
            error: "INSUFFICIENT_WORKSPACE_ROLE",
            message: `Required role: ${roleList.join(", ")}`,
          })
        }
      },
  )
})
