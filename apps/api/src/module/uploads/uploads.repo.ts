import { prisma, type Meeting } from "@workspace/database"

export const uploadsRepo = {
  createPendingMeeting(input: {
    workspaceId: string
    userId: string
    title: string
    fileName: string
    fileType: string
    fileSize: number
  }): Promise<Meeting> {
    return prisma.meeting.create({
      data: {
        workspaceId: input.workspaceId,
        userId: input.userId,
        title: input.title,
        source: "UPLOAD",
        status: "PENDING_UPLOAD",
        fileName: input.fileName,
        fileType: input.fileType,
        fileSize: input.fileSize,
      },
    })
  },

  attachAudioKey(meetingId: string, audioKey: string): Promise<Meeting> {
    return prisma.meeting.update({
      where: { id: meetingId },
      data: { audioKey },
    })
  },

  findById(id: string): Promise<Meeting | null> {
    return prisma.meeting.findUnique({ where: { id } })
  },

  /**
   * Compare-and-swap: only flips PENDING_UPLOAD → UPLOADED. Returns the row
   * count so the caller can detect concurrent completes / wrong state.
   */
  async markUploaded(input: {
    meetingId: string
    workspaceId: string
    fileSize: number | null
  }): Promise<{ updated: number }> {
    const result = await prisma.meeting.updateMany({
      where: {
        id: input.meetingId,
        workspaceId: input.workspaceId,
        status: "PENDING_UPLOAD",
      },
      data: {
        status: "UPLOADED",
        ...(input.fileSize !== null ? { fileSize: input.fileSize } : {}),
      },
    })
    return { updated: result.count }
  },

  listRecentUploadMeetings(workspaceId: string, limit: number): Promise<Meeting[]> {
    return prisma.meeting.findMany({
      where: {
        workspaceId,
        source: "UPLOAD",
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    })
  },
}
