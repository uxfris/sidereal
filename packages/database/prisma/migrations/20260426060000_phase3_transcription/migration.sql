-- AlterTable
ALTER TABLE "meeting"
ADD COLUMN "durationSeconds" INTEGER,
ADD COLUMN "language" TEXT;

-- CreateTable
CREATE TABLE "transcript_segment" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "speaker" TEXT,
    "startMs" INTEGER NOT NULL,
    "endMs" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transcript_segment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transcript_segment_meetingId_index_key" ON "transcript_segment"("meetingId", "index");

-- CreateIndex
CREATE INDEX "transcript_segment_meetingId_startMs_idx" ON "transcript_segment"("meetingId", "startMs");

-- AddForeignKey
ALTER TABLE "transcript_segment" ADD CONSTRAINT "transcript_segment_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
