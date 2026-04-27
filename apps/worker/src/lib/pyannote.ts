import { env } from "../config/env"

export interface DiarizeWindow {
  speaker: string
  startMs: number
  endMs: number
}

export async function diarizeAudio(audioUrl: string): Promise<DiarizeWindow[]> {
  const response = await fetch(`${env.PYANNOTE_URL}/diarize`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ audioUrl }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Diarize HTTP ${response.status}: ${body}`)
  }

  const json = (await response.json()) as { segments?: DiarizeWindow[] }
  if (!Array.isArray(json.segments)) {
    throw new Error("Diarize response missing segments[]")
  }
  return json.segments
}
