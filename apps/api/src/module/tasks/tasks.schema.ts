import { z } from "zod"
import { ActionItemSchema, TasksGroupSchema, UserSummarySchema } from "@workspace/types"

export const taskIdParamsSchema = z.object({
  id: z.string().min(1),
})

export const createTaskBodySchema = z.object({
  title: z.string().min(1).max(500),
  isCompleted: z.boolean().optional().default(false),
  meetingId: z.string().min(1).nullable().optional(),
  assigneeId: z.string().min(1).nullable().optional(),
})

export const patchTaskBodySchema = z.object({
  title: z.string().min(1).max(500).optional(),
  assigneeId: z.string().min(1).nullable().optional(),
})

export const toggleTaskBodySchema = z.object({
  isCompleted: z.boolean(),
})

export const listTasksResponseSchema = z.array(TasksGroupSchema)

export const assigneesResponseSchema = z.array(UserSummarySchema)

export const taskErrorSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
})

export const createTaskResponseSchema = ActionItemSchema
