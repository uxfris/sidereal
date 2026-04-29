// meeting.service.ts

import { meetingsRepo } from "./meetings.repo"

type Segment = {
  id: string
  text: string
  startMs: number
  endMs: number
  speaker: string | null
  index: number
}

function buildConversation(meetingId: string, segments: Segment[]) {
  const messages: Array<{
    id: string
    timestampMs: number
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
        timestampMs: segment.startMs,
        speaker,
        sentences: [sentence],
      })
      continue
    }

    last.sentences.push(sentence)
  }

  return messages
}

export async function getConversation(input: {
  meetingId: string
  workspaceId: string
}) {
  const data = await meetingsRepo.getMeetingWithSegments(
    input.meetingId,
    input.workspaceId
  )

  if (!data) return null

  const messages = buildConversation(data.meeting.id, data.segments)

  return {
    id: data.meeting.id,
    messages,
  }
}
