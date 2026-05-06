import { MeetingSchema } from "@workspace/types"
import { z } from "zod"

export const searchQuerySchema = z.object({
  q: z.string().trim().min(1).max(300),
  limit: z.coerce.number().int().min(1).max(20).default(10),
})

export const searchResultSchema = z.object({
  score: z.number(),
  meeting: MeetingSchema,
})

export const searchResponseSchema = z.object({
  results: z.array(searchResultSchema),
})
