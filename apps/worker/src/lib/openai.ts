import OpenAI from "openai"
import pLimit from "p-limit"
import { z } from "zod"
import { env } from "../config/env"

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY })

/** Rough GPT token estimate for English prose (avoid tiktoken dependency). */
const CHARS_PER_TOKEN = 4
const CHUNK_TOKENS = 500
const OVERLAP_TOKENS = 50
/** Stay under gpt-4o-mini context with room for instructions + schema overhead. */
const MAX_SINGLE_PASS_CHARS = 90_000

const llmLimit = pLimit(5)
const embedLimit = pLimit(5)

const GPT4O_MINI_INPUT_PER_M = 0.15
const GPT4O_MINI_OUTPUT_PER_M = 0.6
const EMBEDDING_SMALL_PER_M = 0.02

export const MeetingAnalysisSchema = z.object({
  summary: z.string(),
  keyPoints: z.array(z.string()),
  actionItems: z.array(
    z.object({
      title: z.string(),
      assigneeHint: z.string().nullable().optional(),
    })
  ),
  sentiment: z.string(),
})

export type MeetingAnalysis = z.infer<typeof MeetingAnalysisSchema>

const ANALYSIS_JSON_SCHEMA = {
  type: "object",
  properties: {
    summary: { type: "string" },
    keyPoints: {
      type: "array",
      items: { type: "string" },
    },
    actionItems: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          assigneeHint: { type: ["string", "null"] },
        },
        required: ["title", "assigneeHint"],
        additionalProperties: false,
      },
    },
    sentiment: { type: "string" },
  },
  required: ["summary", "keyPoints", "actionItems", "sentiment"],
  additionalProperties: false,
} as const

const CHUNK_BULLETS_SCHEMA = {
  type: "object",
  properties: {
    bullets: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["bullets"],
  additionalProperties: false,
} as const

function gpt4oMiniCostUsd(usage: {
  prompt_tokens?: number
  completion_tokens?: number
}): number {
  const inp = usage.prompt_tokens ?? 0
  const out = usage.completion_tokens ?? 0
  return (inp * GPT4O_MINI_INPUT_PER_M + out * GPT4O_MINI_OUTPUT_PER_M) / 1_000_000
}

function embeddingCostUsd(totalTokens: number): number {
  return (totalTokens * EMBEDDING_SMALL_PER_M) / 1_000_000
}

export function chunkTranscriptForLlm(fullText: string): string[] {
  const windowChars = CHUNK_TOKENS * CHARS_PER_TOKEN
  const stepChars = (CHUNK_TOKENS - OVERLAP_TOKENS) * CHARS_PER_TOKEN
  if (fullText.length <= windowChars) return [fullText]

  const out: string[] = []
  for (let i = 0; i < fullText.length; i += stepChars) {
    out.push(fullText.slice(i, i + windowChars))
    if (i + windowChars >= fullText.length) break
  }
  return out
}

async function structuredCompletion(params: {
  name: string
  schema: Record<string, unknown>
  system: string
  user: string
}): Promise<{ raw: string; costUsd: number }> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [
      { role: "system", content: params.system },
      { role: "user", content: params.user },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: params.name,
        strict: true,
        schema: params.schema,
      },
    },
  })

  const choice = completion.choices[0]?.message?.content
  if (!choice) throw new Error("OpenAI returned empty completion")

  const costUsd = gpt4oMiniCostUsd(completion.usage ?? {})
  return { raw: choice, costUsd }
}

/**
 * Per-chunk extraction for long transcripts (map phase).
 */
async function extractBulletsFromChunk(
  chunk: string,
  index: number,
  total: number
): Promise<{ bullets: string[]; costUsd: number }> {
  return llmLimit(async () => {
    const { raw, costUsd } = await structuredCompletion({
      name: "chunk_facts",
      schema: CHUNK_BULLETS_SCHEMA,
      system:
        "You extract concise factual bullets from a meeting transcript excerpt. " +
        "No preamble. Use short imperative phrases. If the excerpt is empty or unusable, return an empty bullets array.",
      user: `Part ${index + 1} of ${total}:\n\n${chunk}`,
    })
    const parsed = JSON.parse(raw) as { bullets?: string[] }
    return { bullets: Array.isArray(parsed.bullets) ? parsed.bullets : [], costUsd }
  })
}

async function analyzeCondensedTranscript(
  condensedText: string
): Promise<{ analysis: MeetingAnalysis; costUsd: number }> {
  return llmLimit(async () => {
    const { raw, costUsd } = await structuredCompletion({
      name: "meeting_analysis",
      schema: ANALYSIS_JSON_SCHEMA,
      system:
        "You summarize meetings for product teams. Output must follow the JSON schema. " +
        "Sentiment should be one of: positive, neutral, negative, or mixed. " +
        "Action items should be concrete tasks, not vague wishes.",
      user: `Meeting transcript (possibly condensed from overlapping chunks):\n\n${condensedText}`,
    })

    const parsed = JSON.parse(raw) as unknown
    const analysis = MeetingAnalysisSchema.parse(parsed)

    return { analysis, costUsd }
  })
}

/**
 * Single-call analysis when the transcript fits comfortably in context;
 * otherwise map (chunk bullets) + reduce (structured analysis).
 */
export async function analyzeMeetingTranscript(
  fullTranscript: string
): Promise<{ analysis: MeetingAnalysis; costUsd: number }> {
  const trimmed = fullTranscript.trim()
  if (!trimmed) {
    throw new Error("Empty transcript; nothing to analyze")
  }

  if (trimmed.length <= MAX_SINGLE_PASS_CHARS) {
    const chunks = chunkTranscriptForLlm(trimmed)
    const numbered =
      chunks.length === 1
        ? trimmed
        : chunks
            .map((c, i) => `--- Chunk ${i + 1} / ${chunks.length} ---\n${c}`)
            .join("\n\n")

    return analyzeCondensedTranscript(numbered)
  }

  const chunks = chunkTranscriptForLlm(trimmed)
  const chunkResults = await Promise.all(
    chunks.map((chunk, index) =>
      extractBulletsFromChunk(chunk, index, chunks.length)
    )
  )
  const mapCost = chunkResults.reduce((sum, r) => sum + r.costUsd, 0)
  const bulletLists = chunkResults.map((r) => r.bullets)

  const condensed = bulletLists
    .flat()
    .map((b) => `- ${b}`)
    .join("\n")

  const { analysis, costUsd: reduceCost } =
    await analyzeCondensedTranscript(
      `Facts extracted from long transcript (deduplicate mentally):\n\n${condensed}`
    )

  return { analysis, costUsd: mapCost + reduceCost }
}

export async function embedText(text: string): Promise<{
  embedding: number[]
  costUsd: number
}> {
  return embedLimit(async () => {
    const res = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    })

    const vec = res.data[0]?.embedding
    if (!vec || vec.length !== 1536) {
      throw new Error("Unexpected embedding dimensions from OpenAI")
    }

    const tokens = res.usage?.total_tokens ?? Math.ceil(text.length / CHARS_PER_TOKEN)
    const costUsd = embeddingCostUsd(tokens)

    return { embedding: vec, costUsd }
  })
}

/**
 * Phase 5 plan surface area — each function performs a full model pass.
 * Prefer `analyzeMeetingTranscript` once, then read fields from the result.
 */
export async function summarize(transcript: string): Promise<string> {
  const { analysis } = await analyzeMeetingTranscript(transcript)
  return analysis.summary
}

export async function extractActionItems(
  transcript: string
): Promise<MeetingAnalysis["actionItems"]> {
  const { analysis } = await analyzeMeetingTranscript(transcript)
  return analysis.actionItems
}

export async function embed(chunk: string) {
  return embedText(chunk)
}
