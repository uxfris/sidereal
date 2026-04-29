import { meetingsRepo } from "./meetings.repo"

export async function getConversation(input: {
  meetingId: string
  workspaceId: string
}) {
  return meetingsRepo.toConversation(input.meetingId, input.workspaceId)
}
