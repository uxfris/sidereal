import { prisma } from "@workspace/database";
import { ProcessingStage } from "../types/events";

export async function emitProcessingEvent(params: {
    meetingId: string;
    stage: ProcessingStage;
    message?: string;
    metadata?: Record<string, any>;
}) {
    return prisma.processingEvent.create({
        data: {
            meetingId: params.meetingId,
            stage: params.stage,
            message: params.message,
            // optional future field if you extend schema
            // metadata: params.metadata
        },
    });
}