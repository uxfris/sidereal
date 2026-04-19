import { FastifyInstance } from "fastify";
import { prisma } from "@workspace/database";
import { createPresignedUpload } from "../../lib/s3-predesign";

export async function uploadInitRoute(app: FastifyInstance) {
    app.post(
        "/uploads/init",
        {
            preHandler: [app.verifySession]
        },
        async (req) => {
            const { fileType } = req.body as { fileType: string }

            const user = req.user

            const presigned = await createPresignedUpload(
                {
                    userId: user.id,
                    fileType
                }
            )

            const upload = await prisma.upload.create({
                data: {
                    id: presigned.uploadId,
                    userId: user.id,
                    key: presigned.key
                }
            })

            return {
                uploadId: upload.id,
                uploadUrl: presigned.url,
                key: presigned.key
            }
        }
    )
}