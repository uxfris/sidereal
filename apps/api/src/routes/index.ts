import { FastifyInstance } from "fastify";
import { healthRoute } from "./health.route";
import { userRoute } from "../module/users/users.route";

export async function registerRoute(app: FastifyInstance) {
    await app.register(healthRoute)
    await app.register(userRoute, { prefix: "/users" })
}