import { FastifyInstance } from "fastify"
import { healthRoute } from "./health.route"
import { userRoute } from "../module/users/users.route"
import { uploadsRoutes } from "../module/uploads/uploads.route"
import {
  invitationsAcceptRoute,
  workspacesRoutes,
} from "../module/workspaces/workspaces.route"
import { meetingsRoutes } from "../module/meetings/meetings.route"

export async function registerRoute(app: FastifyInstance) {
  await app.register(healthRoute)
  await app.register(userRoute, { prefix: "/users" })
  await app.register(workspacesRoutes, { prefix: "/workspaces" })
  await app.register(invitationsAcceptRoute, { prefix: "/invitations" })
  await app.register(uploadsRoutes, { prefix: "/uploads" })
  await app.register(meetingsRoutes, { prefix: "/meetings" })
}