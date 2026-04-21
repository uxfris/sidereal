/*
  Warnings:

  - You are about to drop the `Meeting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MeetingChunk` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProcessingEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Upload` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_userId_fkey";

-- DropForeignKey
ALTER TABLE "MeetingChunk" DROP CONSTRAINT "MeetingChunk_meetingId_fkey";

-- DropForeignKey
ALTER TABLE "ProcessingEvent" DROP CONSTRAINT "ProcessingEvent_meetingId_fkey";

-- DropTable
DROP TABLE "Meeting";

-- DropTable
DROP TABLE "MeetingChunk";

-- DropTable
DROP TABLE "ProcessingEvent";

-- DropTable
DROP TABLE "Upload";

-- DropEnum
DROP TYPE "MeetingStatus";

-- DropEnum
DROP TYPE "UploadStatus";
