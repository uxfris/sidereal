import { env } from "../config/env"

export interface WhisperSegment {
  startMs: number
  endMs: number
  text: string
}

export interface WhisperTranscribeResponse {
  text: string
  language?: string | null
  durationSeconds?: number | null
  segments: WhisperSegment[]
}

export async function transcribeAudio(
  audioUrl: string
): Promise<WhisperTranscribeResponse> {
  const response = await fetch(`${env.WHISPER_URL}/transcribe`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ audioUrl }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Whisper HTTP ${response.status}: ${body}`)
  }

  const json = (await response.json()) as WhisperTranscribeResponse

  if (!Array.isArray(json.segments)) {
    throw new Error("Whisper response missing segments[]")
  }

  return json
}
