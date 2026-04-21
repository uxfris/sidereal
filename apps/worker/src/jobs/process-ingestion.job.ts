import { prisma } from "@workspace/database";
import { createTempFilePath } from "../utils/temp-files";
import { downloadFromS3 } from "../services/s3-download.service";
import { convertAudioToStandardWav } from "../services/ffmpeg.service";
import { transcribeAudio } from "../services/whisper.service";
import { summarizeTranscript } from "../services/summarize.service";
import { embedText } from "../services/embeddings.service";
import type { IngestionJob } from "../types/ingestion";
import { randomUUID } from "crypto";
import { emitProcessingEvent } from "../services/event-emitter.service";

function chunkText(text: string, size = 1200) {
    const chunks: string[] = [];
    for (let i = 0; i < text.length; i += size) {
        chunks.push(text.slice(i, i + size));
    }
    return chunks;
}

export async function processIngestionJob(job: IngestionJob) {
    const meeting = await prisma.meeting.findUnique({
        where: { id: job.meetingId },
    });

    if (!meeting) {
        throw new Error(`Meeting not found: ${job.meetingId}`);
    }

    await prisma.meeting.update({
        where: { id: meeting.id },
        data: { status: "PROCESSING" },
    });

    const inputPath = await createTempFilePath(".input");
    const wavPath = await createTempFilePath(".wav");

    try {
        await emitProcessingEvent({
            meetingId: meeting.id,
            stage: "DOWNLOADING",
            message: "Downloading file from S3",
        });

        await downloadFromS3({
            key: job.artifact.s3Key,
            outputPath: inputPath,
        });

        await emitProcessingEvent({
            meetingId: meeting.id,
            stage: "TRANSCODING",
            message: "Normalizing audio with ffmpeg",
        });


        await convertAudioToStandardWav(inputPath, wavPath);

        await emitProcessingEvent({
            meetingId: meeting.id,
            stage: "TRANSCRIBING",
            message: "Running Whisper transcription",
        });

        const transcriptResult = await transcribeAudio(wavPath);
        const transcript = transcriptResult.text ?? "";

        await emitProcessingEvent({
            meetingId: meeting.id,
            stage: "SUMMARIZING",
            message: "Generating meeting summary",
        });

        const summary = await summarizeTranscript({
            title: meeting.title,
            transcript,
        });

        const chunks = chunkText(transcript);

        await emitProcessingEvent({
            meetingId: meeting.id,
            stage: "EMBEDDING",
            message: "Generating semantic embeddings",
            metadata: {
                chunks: chunks.length,
            },
        });

        for (const content of chunks) {
            const embedding = await embedText(content);
            const vectorLiteral = `[${embedding.join(",")}]`;
            const id = randomUUID();

            await prisma.$executeRaw`
                INSERT INTO "MeetingChunk" ("id", "meetingId", "content", "embedding", "createdAt")
                VALUES (
                    ${id},
                    ${meeting.id},
                    ${content},
                    ${vectorLiteral}::vector,
                    NOW()
                )
            `;
        }

        await prisma.meeting.update({
            where: { id: meeting.id },
            data: {
                transcriptRaw: transcript,
                summary: summary as any,
                language: transcriptResult.language ?? null,
                status: "SUMMARIZED",
            },
        });

        await prisma.upload.updateMany({
            where: { meetingId: meeting.id },
            data: { status: "COMPLETED" },
        });

        await emitProcessingEvent({
            meetingId: meeting.id,
            stage: "COMPLETED",
            message: "Processing complete",
        });


    } catch (err) {
        await emitProcessingEvent({
            meetingId: meeting.id,
            stage: "FAILED",
            message: err instanceof Error ? err.message : "Unknown error",
        });

        await prisma.meeting.update({
            where: { id: meeting.id },
            data: { status: "FAILED" },
        });
        throw err;
    }
}