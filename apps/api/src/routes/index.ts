import { FastifyInstance } from "fastify";
import { healthRoute } from "./health.route";
import { userRoute } from "../module/users/users.route";
import { uploadInitRoute } from "../module/uploads/upload.init.route";
import { uploadCompleteRoute } from "../module/uploads/upload.complete.route";
import { uploadGetRoute } from "../module/uploads/upload.get.route";
import { meetingEventsRoute } from "../module/meetings/meeting.events.route";
import { meetingGetRoute } from "../module/meetings/meeting.get.route";
import { meetingListRoute } from "../module/meetings/meeting.list.route";
import { meRoute } from "./me.route";

export async function registerRoute(app: FastifyInstance) {
    await app.register(healthRoute)
    await app.register(meRoute)
    await app.register(userRoute, { prefix: "/users" })

    await app.register(uploadInitRoute)
    await app.register(uploadCompleteRoute)
    await app.register(uploadGetRoute)

    await app.register(meetingGetRoute)
    await app.register(meetingEventsRoute)
    await app.register(meetingListRoute)
}