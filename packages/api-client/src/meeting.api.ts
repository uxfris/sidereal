import type { Meeting, UpcomingMeetingGroup } from "@workspace/types"
import { client } from "./client"

type ListMeetingsResponse = {
  meetings: Meeting[]
  nextCursor: string | null
}

export const meetingApi = {
  /**
   * Cursor-paginated list; defaults match the API (`limit` 20).
   */
  async getMeetings(options?: {
    cursor?: string
    limit?: number
  }): Promise<ListMeetingsResponse> {
    return client.get<ListMeetingsResponse>("/meetings", {
      params: {
        cursor: options?.cursor,
        limit: options?.limit,
      },
    })
  },

  /** Convenience for views that only need the first page as an array. */
  async getMeetingsList(options?: { limit?: number }): Promise<Meeting[]> {
    const res = await meetingApi.getMeetings({
      limit: options?.limit ?? 50,
    })
    return res.meetings
  },

  /**
   * Phase 10 will replace this with calendar integration. Until then the API
   * does not expose upcoming events — return an empty list so the UI stays real-data-only.
   */
  async getUpcomingMeetings(): Promise<UpcomingMeetingGroup[]> {
    return []
  },

  async getMeeting(id: string): Promise<Meeting> {
    return client.get<Meeting>(`/meetings/${id}`)
  },

  async updateMeeting(
    id: string,
    body: { title?: string; isShared?: boolean }
  ): Promise<void> {
    await client.patch(`/meetings/${id}`, body)
  },

  async deleteMeeting(id: string): Promise<void> {
    await client.delete(`/meetings/${id}`)
  },
}
