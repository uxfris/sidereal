import { z } from "zod"
import { ConversationSchema } from "@workspace/types"

export const getConversationParamsSchema = z.object({
  id: z.string().min(1),
})

export const getConversationResponseSchema = ConversationSchema

export const meetingErrorSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
})
