export type IngestionSource = "UPLOAD" | "RECALL";

export type IngestionJob = {
    meetingId: string;
    source: IngestionSource;
    artifact: {
        s3Key: string;
        contentType?: string;
        kind: "audio" | "video" | "pdf";
    };
    title?: string;
    raw?: unknown;
};