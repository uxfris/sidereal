-- AlterTable
ALTER TABLE "meeting" ADD COLUMN "summary" JSONB;

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "meetingId" TEXT,
    "title" TEXT NOT NULL,
    "assigneeId" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "dueAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meeting_chunk" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "startMs" INTEGER NOT NULL,
    "endMs" INTEGER NOT NULL,
    "embedding" vector(1536) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meeting_chunk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "task_workspaceId_isCompleted_createdAt_idx" ON "task"("workspaceId", "isCompleted", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "task_meetingId_idx" ON "task"("meetingId");

-- CreateIndex
CREATE INDEX "meeting_chunk_meetingId_idx" ON "meeting_chunk"("meetingId");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meeting_chunk" ADD CONSTRAINT "meeting_chunk_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
