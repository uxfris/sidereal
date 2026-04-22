import { FastifyInstance } from "fastify"
import { healthRoute } from "./health.route"
import { userRoute } from "../module/users/users.route"
import {
  invitationsAcceptRoute,
  workspacesRoutes,
} from "../module/workspaces/workspaces.route"

export async function registerRoute(app: FastifyInstance) {
  await app.register(healthRoute)
  await app.register(userRoute, { prefix: "/users" })
  await app.register(workspacesRoutes, { prefix: "/workspaces" })
  await app.register(invitationsAcceptRoute, { prefix: "/invitations" })
}