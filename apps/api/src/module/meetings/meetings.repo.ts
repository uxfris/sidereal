// meeting.repo.ts
import { prisma } from "@workspace/database"

export const meetingsRepo = {
  async getMeetingWithSegments(meetingId: string, workspaceId: string) {
    const meeting = await prisma.meeting.findFirst({
      where: { id: meetingId, workspaceId },
      select: { id: true },
    })

    if (!meeting) return null

    const segments = await prisma.transcriptSegment.findMany({
      where: { meetingId },
      orderBy: { index: "asc" },
    })

    return {
      meeting,
      segments,
    }
  },
}
