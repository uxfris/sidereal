import { prisma } from "@workspace/database"

function toTimestamp(totalMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(totalMs / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

export const meetingsRepo = {
  async toConversation(meetingId: string, workspaceId: string) {
    const meeting = await prisma.meeting.findFirst({
      where: { id: meetingId, workspaceId },
      select: { id: true },
    })
    if (!meeting) return null

    const segments = await prisma.transcriptSegment.findMany({
      where: { meetingId },
      orderBy: { index: "asc" },
    })

    const messages: Array<{
      id: string
      timestamp: string
      speaker: string
      sentences: Array<{
        id: string
        text: string
        startTimeMs: number
        endTimeMs: number
      }>
    }> = []

    for (const segment of segments) {
      const speaker = segment.speaker ?? "Speaker A"
      const sentence = {
        id: segment.id,
        text: segment.text,
        startTimeMs: segment.startMs,
        endTimeMs: segment.endMs,
      }

      const last = messages[messages.length - 1]
      if (!last || last.speaker !== speaker) {
        messages.push({
          id: `${meetingId}-${segment.index}`,
          timestamp: toTimestamp(segment.startMs),
          speaker,
          sentences: [sentence],
        })
        continue
      }

      last.sentences.push(sentence)
    }

    return {
      id: meeting.id,
      messages,
    }
  },
}
