import { z } from "zod"

export const UploadSchema = z.object({
    id: z.string(),
    title: z.string(),
    progress: z.number(),
    status: z.string(),
    size: z.string(),
    timestamp: z.string(),
    type: z.enum(["video", "audio", "pdf"])
})


export type Upload = z.infer<typeof UploadSchema>