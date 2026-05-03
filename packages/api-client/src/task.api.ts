import type { ActionItem, TasksGroup, UserSummary } from "@workspace/types"
import { client } from "./client"

export type CreateTaskInput = {
  title: string
  isCompleted: boolean
  assignee: UserSummary | null
  /** Omit or pass null for workspace-level tasks (not tied to a meeting). */
  meetingId?: string | null
}

export const taskApi = {
  async fetchTasksGroup(): Promise<TasksGroup[]> {
    return client.get<TasksGroup[]>("/tasks")
  },

  async fetchAssignees(): Promise<UserSummary[]> {
    return client.get<UserSummary[]>("/tasks/assignees")
  },

  async toggle(id: string, isCompleted: boolean): Promise<void> {
    await client.post(`/tasks/${id}/toggle`, { isCompleted })
  },

  async add(input: CreateTaskInput): Promise<ActionItem> {
    return client.post<ActionItem>("/tasks", {
      title: input.title,
      isCompleted: input.isCompleted,
      meetingId: input.meetingId ?? null,
      assigneeId: input.assignee?.id ?? null,
    })
  },

  async remove(id: string): Promise<void> {
    await client.delete(`/tasks/${id}`)
  },

  async updateTitle(id: string, title: string): Promise<void> {
    await client.patch(`/tasks/${id}`, { title })
  },

  async updateAssignee(id: string, assignee: UserSummary | null): Promise<void> {
    await client.patch(`/tasks/${id}`, {
      assigneeId: assignee?.id ?? null,
    })
  },
}
