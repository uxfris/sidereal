import { FastifyInstance } from "fastify";
import { prisma } from "@workspace/database";

export async function meetingEventsRoute(app: FastifyInstance) {
    app.get(
        "/meetings/:id/events",
        {
            preHandler: app.verifySession
        },
        async (req, reply) => {
            const { id } = req.params as { id: string }

            const events = await prisma.processingEvent.findMany({
                where: { meetingId: id },
                orderBy: { createdAt: "asc" }
            })
            return events
        }
    )

}