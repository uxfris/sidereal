import type { Meeting } from "@workspace/types"
import { client, type RequestOptions } from "./client"

type SearchResponse = {
  results: Array<{
    score: number
    meeting: Meeting
  }>
}

export const searchApi = {
  async searchMeetings(
    query: string,
    options?: { limit?: number } & RequestOptions
  ): Promise<SearchResponse["results"]> {
    const { limit, ...fetchOpts } = options ?? {}
    const res = await client.get<SearchResponse>("/search", {
      params: {
        q: query,
        limit: limit ?? 10,
      },
      ...fetchOpts,
    })
    return res.results
  },
}
