import { FastifyInstance } from "fastify";
import { prisma } from "@workspace/database";
import { createIngestionQueue } from "@workspace/queue";

const queue = createIngestionQueue(process.env.REDIS_URL!);


export async function uploadCompleteRoute(app: FastifyInstance) {
    app.post(
        "/upload/complete",
        { preHandler: app.verifySession },
        async (req) => {
            const { uploadId, title } = req.body as {
                uploadId: string,
                title?: string
            }

            const upload = await prisma.upload.update({
                where: { id: uploadId },
                data: { status: "UPLOADED" }
            })

            const meeting = await prisma.meeting.create({
                data: {
                    userId: upload.userId,
                    title: title || "Untitled Meeting",
                    status: "UPLOADED",
                    audioUrl: upload.key
                }
            })

            await prisma.upload.update({
                where: { id: uploadId },
                data: {
                    meetingId: meeting.id
                }
            })


            await queue.add("process-ingestion", {
                meetingId: meeting.id,
                source: "UPLOAD",
                artifact: {
                    s3Key: upload.key,
                    kind: upload.fileType,
                    fileName: upload.fileName,
                    // contentType: "video/mp4",
                    contentType: upload.fileType,
                },
                title: title || "Untitled Meeting",
            });


            return {
                meetingId: meeting.id,
                status: "queued"
            }
        }
    )
}