import { FastifyInstance } from "fastify";
import { healthRoute } from "./health.route";
import { userRoute } from "../module/users/users.route";
import { uploadInitRoute } from "../module/uploads/upload.init.route";
import { uploadCompleteRoute } from "../module/uploads/upload.complete.route";

export async function registerRoute(app: FastifyInstance) {
    await app.register(healthRoute)
    await app.register(userRoute, { prefix: "/users" })
    await app.register(uploadInitRoute)
    await app.register(uploadCompleteRoute)
}