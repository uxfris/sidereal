/*
  Warnings:

  - Added the required column `fileType` to the `Upload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Upload" ADD COLUMN     "fileName" TEXT,
ADD COLUMN     "fileType" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProcessingEvent" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "message" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcessingEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProcessingEvent" ADD CONSTRAINT "ProcessingEvent_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
