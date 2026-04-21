import { FastifyInstance } from "fastify";
import { prisma } from "@workspace/database";

export async function uploadGetRoute(app: FastifyInstance) {
    app.get(
        "/uploads/:id",
        { preHandler: app.verifySession },
        async (req, reply) => {
            const { id } = req.params as { id: string }

            const upload = await prisma.upload.findUnique({
                where: { id }
            })

            if (!upload) {
                return reply.status(404).send({ error: "NOT_FOUND" })
            }

            return upload;
        }
    )

}