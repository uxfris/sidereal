import {
  GetMeResponseSchema,
  ListWorkspacesResponseSchema,
  WorkspaceSummarySchema,
  type GetMeResponse,
  type WorkspaceMembership,
  type WorkspaceSummary,
} from "@workspace/types"
import { client } from "./client"

export const workspaceApi = {
  async getMe(): Promise<GetMeResponse> {
    const data = await client.get<unknown>("/users/me")
    return GetMeResponseSchema.parse(data)
  },

  async list(): Promise<WorkspaceMembership[]> {
    const data = await client.get<unknown>("/workspaces")
    const parsed = ListWorkspacesResponseSchema.parse(data)
    return parsed.workspaces
  },

  async create(name: string): Promise<WorkspaceSummary> {
    const data = await client.post<unknown>("/workspaces", { name })
    return WorkspaceSummarySchema.parse(data)
  },
}
