// meeting.presenter.ts
function toTimestamp(totalMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(totalMs / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

export function toConversationDTO(conversation: {
  id: string
  messages: Array<{
    id: string
    timestampMs: number
    speaker: string
    sentences: Array<{
      id: string
      text: string
      startTimeMs: number
      endTimeMs: number
    }>
  }>
}) {
  return {
    id: conversation.id,
    messages: conversation.messages.map((m) => ({
      ...m,
      timestamp: toTimestamp(m.timestampMs),
    })),
  }
}
