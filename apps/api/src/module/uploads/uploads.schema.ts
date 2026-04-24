import { z } from "zod"

/**
 * Allowlist of accepted MIME types. Mirrors the UI hints in
 * `apps/web/app/(app)/dashboard/uploads/_components/upload-input.tsx`.
 */
const ALLOWED_MIME_PATTERNS = [/^audio\//i, /^video\//i, /^application\/pdf$/i]

function isAllowedMime(value: string): boolean {
  return ALLOWED_MIME_PATTERNS.some((pattern) => pattern.test(value))
}

const fileTypeSchema = z
  .string()
  .min(1)
  .max(255)
  .refine(isAllowedMime, {
    message:
      "Unsupported file type. Allowed: audio/*, video/*, application/pdf.",
  })

// Arbitrary upper bound — 2 GB. Tighten per plan at billing time.
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024 * 1024

export const presignUploadBodySchema = z.object({
  fileName: z.string().min(1).max(512),
  fileType: fileTypeSchema,
  fileSize: z
    .number()
    .int()
    .positive()
    .max(MAX_FILE_SIZE_BYTES, { message: "File too large." }),
  title: z.string().min(1).max(200).optional(),
})
export type PresignUploadBody = z.infer<typeof presignUploadBodySchema>

export const presignUploadResponseSchema = z.object({
  meetingId: z.string(),
  key: z.string(),
  url: z.string(),
  expiresInSeconds: z.number(),
})

export const completeUploadParamsSchema = z.object({
  id: z.string().min(1),
})

export const completeUploadResponseSchema = z.object({
  meetingId: z.string(),
  status: z.string(),
})

const meetingStatusEnum = z.enum([
  "PENDING_UPLOAD",
  "UPLOADED",
  "TRANSCRIBING",
  "TRANSCRIBED",
  "ANALYZING",
  "SUMMARIZED",
  "FAILED",
])

export const uploadSummarySchema = z.object({
  meetingId: z.string(),
  title: z.string(),
  fileName: z.string().nullable(),
  fileType: z.string().nullable(),
  fileSize: z.number().nullable(),
  status: meetingStatusEnum,
  createdAt: z.string(),
})
export type UploadSummary = z.infer<typeof uploadSummarySchema>

export const listUploadsQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

export const listUploadsResponseSchema = z.object({
  uploads: z.array(uploadSummarySchema),
})

export const uploadErrorSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
})
