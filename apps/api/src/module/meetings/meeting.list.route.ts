import { FastifyInstance } from "fastify";
import { prisma } from "@workspace/database";

export async function meetingListRoute(app: FastifyInstance) {
    app.get(
        "/meetings",
        {
            preHandler: app.verifySession
        },
        async (req, reply) => {
            const user = req.user;
            return await prisma.meeting.findMany({
                where: { userId: user.id },
                orderBy: { createdAt: "desc" },
                take: 20
            })
        }
    )

}