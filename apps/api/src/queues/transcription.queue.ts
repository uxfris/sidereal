import { prisma } from "@workspace/database";

export async function processUploadJob(job: {
    meetingId: string;
    s3Key: string;
}) {

    const meeting = await prisma.meeting.findUnique({
        where: { id: job.meetingId }
    })

    if (!meeting) throw new Error("Meeting not found")

    await prisma.meeting.update({
        where: { id: meeting.id },
        data: { status: "PROCESSING" }
    })

    // 1. download from S3
    // 2. ffmpeg normalize
    // 3. whisper transcription
    // 4. diarization
    // 5. summarization
    // 6. embeddings

    await prisma.meeting.update({
        where: { id: meeting.id },
        data: { status: "TRANSCRIBED" }
    })

}