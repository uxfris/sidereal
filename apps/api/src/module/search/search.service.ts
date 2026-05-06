import OpenAI from "openai"
import { env } from "../../config/env"
import { toMeetingDTO } from "../meetings/meetings.presenter"
import { searchRepo } from "./search.repo"
import { getRedisConnection } from "@workspace/queue"

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY })
const CACHE_TTL_SECONDS = 60
const MIN_SEMANTIC_SCORE = 0.35
const MIN_KEYWORD_SCORE = 0.2

async function getCachedEmbedding(query: string): Promise<number[] | null> {
  const redis = getRedisConnection()
  const key = `search:embedding:${query.trim().toLowerCase()}`
  const raw = await redis.get(key)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as number[]
    if (!Array.isArray(parsed) || parsed.length !== 1536) return null
    return parsed
  } catch {
    return null
  }
}

async function setCachedEmbedding(query: string, embedding: number[]) {
  const redis = getRedisConnection()
  const key = `search:embedding:${query.trim().toLowerCase()}`
  await redis.set(key, JSON.stringify(embedding), "EX", CACHE_TTL_SECONDS)
}

async function embedQuery(query: string): Promise<number[]> {
  const cached = await getCachedEmbedding(query)
  if (cached) return cached

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: query,
  })

  const embedding = response.data[0]?.embedding
  if (!embedding || embedding.length !== 1536) {
    throw new Error("Unexpected embedding dimensions")
  }

  await setCachedEmbedding(query, embedding)
  return embedding
}

export async function searchMeetings(input: {
  workspaceId: string
  query: string
  limit: number
}) {
  await searchRepo.ensureSearchIndexes()

  const embedding = await embedQuery(input.query)

  const [semanticRows, keywordRows] = await Promise.all([
    searchRepo.semanticSearch({
      workspaceId: input.workspaceId,
      embedding,
      limit: Math.max(input.limit * 2, 20),
      minScore: MIN_SEMANTIC_SCORE,
    }),
    searchRepo.keywordSearch({
      workspaceId: input.workspaceId,
      query: input.query,
      limit: Math.max(input.limit * 2, 20),
      minScore: MIN_KEYWORD_SCORE,
    }),
  ])

  const merged = new Map<string, number>()
  for (const row of semanticRows) {
    const prev = merged.get(row.meetingId) ?? Number.NEGATIVE_INFINITY
    merged.set(row.meetingId, Math.max(prev, row.score))
  }
  for (const row of keywordRows) {
    const prev = merged.get(row.meetingId) ?? Number.NEGATIVE_INFINITY
    merged.set(row.meetingId, Math.max(prev, row.score))
  }

  const rankedIds = [...merged.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, input.limit)
    .map(([meetingId]) => meetingId)

  const rows = await searchRepo.listMeetingsByIds({
    workspaceId: input.workspaceId,
    meetingIds: rankedIds,
  })
  const rowById = new Map(rows.map((row) => [row.id, row]))

  return rankedIds
    .map((meetingId) => {
      const row = rowById.get(meetingId)
      if (!row) return null
      return {
        score: merged.get(meetingId) ?? 0,
        meeting: toMeetingDTO(row),
      }
    })
    .filter((row): row is { score: number; meeting: ReturnType<typeof toMeetingDTO> } => !!row)
}
