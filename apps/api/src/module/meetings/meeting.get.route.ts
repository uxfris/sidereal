import { FastifyInstance } from "fastify";
import { prisma } from "@workspace/database";

export async function meetingGetRoute(app: FastifyInstance) {
    app.get(
        "/meetings/:id",
        {
            preHandler: app.verifySession
        },
        async (req, reply) => {
            const { id } = req.params as { id: string }

            const meeting = await prisma.meeting.findUnique({
                where: { id },
                include: {
                    chunks: false
                }
            })

            if (!meeting) {
                return reply.status(404).send({ error: "NOT_FOUND" })
            }

            return meeting
        }
    )
}