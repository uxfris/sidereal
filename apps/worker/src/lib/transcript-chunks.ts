/**
 * Group transcript lines into ~500-token windows for embedding (same heuristic as LLM chunking).
 */
const CHARS_PER_TOKEN = 4
const TARGET_TOKENS = 500
const MAX_CHUNK_CHARS = TARGET_TOKENS * CHARS_PER_TOKEN

export type SegmentRow = {
  text: string
  startMs: number
  endMs: number
  speaker: string | null
}

export function chunkSegmentsForEmbedding(
  segments: SegmentRow[]
): Array<{ content: string; startMs: number; endMs: number }> {
  const out: Array<{ content: string; startMs: number; endMs: number }> = []
  let lines: string[] = []
  let startMs = 0
  let endMs = 0
  let started = false

  const flush = () => {
    if (lines.length === 0) return
    out.push({
      content: lines.join("\n"),
      startMs,
      endMs,
    })
    lines = []
    started = false
  }

  for (const seg of segments) {
    const prefix = seg.speaker?.trim() || "Speaker"
    const line = `${prefix}: ${seg.text}`

    const prospective = [...lines, line].join("\n")
    if (prospective.length > MAX_CHUNK_CHARS && lines.length > 0) {
      flush()
    }

    if (!started) {
      startMs = seg.startMs
      started = true
    }
    lines.push(line)
    endMs = seg.endMs
  }

  flush()
  return out
}
