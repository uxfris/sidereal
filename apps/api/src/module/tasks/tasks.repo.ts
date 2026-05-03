import { prisma, type Prisma } from "@workspace/database"

export const tasksRepo = {
  listForWorkspace(workspaceId: string) {
    return prisma.task.findMany({
      where: {
        workspaceId,
        OR: [
          { meetingId: null },
          { meeting: { deletedAt: null } },
        ],
      },
      include: {
        assignee: true,
        meeting: true,
      },
      orderBy: { createdAt: "desc" },
    })
  },

  findByIdForWorkspace(taskId: string, workspaceId: string) {
    return prisma.task.findFirst({
      where: { id: taskId, workspaceId },
      include: { assignee: true, meeting: true },
    })
  },

  countMembers(workspaceId: string, userId: string) {
    return prisma.workspaceMember.count({
      where: { workspaceId, userId },
    })
  },

  create(data: Prisma.TaskCreateInput) {
    return prisma.task.create({ data, include: { assignee: true } })
  },

  update(
    taskId: string,
    workspaceId: string,
    data: Prisma.TaskUncheckedUpdateInput
  ) {
    return prisma.task.updateMany({
      where: { id: taskId, workspaceId },
      data,
    })
  },

  remove(taskId: string, workspaceId: string) {
    return prisma.task.deleteMany({
      where: { id: taskId, workspaceId },
    })
  },

  listMembersWithUsers(workspaceId: string) {
    return prisma.workspaceMember.findMany({
      where: { workspaceId },
      include: { user: true },
      orderBy: { joinedAt: "asc" },
    })
  },
}
