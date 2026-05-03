-- AlterTable
ALTER TABLE "meeting" ADD COLUMN "deletedAt" TIMESTAMP(3),
ADD COLUMN "isShared" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "meeting_workspaceId_deletedAt_createdAt_idx" ON "meeting"("workspaceId", "deletedAt", "createdAt" DESC);
