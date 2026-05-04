-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."MeetingSource" AS ENUM('UPLOAD', 'BOT');--> statement-breakpoint
CREATE TYPE "public"."MeetingStatus" AS ENUM('PENDING_UPLOAD', 'UPLOADED', 'TRANSCRIBING', 'TRANSCRIBED', 'ANALYZING', 'SUMMARIZED', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."ProcessingEventStatus" AS ENUM('STARTED', 'SUCCEEDED', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."ProcessingStage" AS ENUM('TRANSCRIBE', 'DIARIZE', 'ANALYZE', 'EMBED');--> statement-breakpoint
CREATE TYPE "public"."WorkspaceRole" AS ENUM('OWNER', 'ADMIN', 'MEMBER', 'GUEST');--> statement-breakpoint
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"createdAt" timestamp(3) NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspace" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp(3) NOT NULL,
	"createdAt" timestamp(3),
	"updatedAt" timestamp(3)
);
--> statement-breakpoint
CREATE TABLE "invitation" (
	"id" text PRIMARY KEY NOT NULL,
	"workspaceId" text NOT NULL,
	"email" text NOT NULL,
	"role" "WorkspaceRole" DEFAULT 'MEMBER' NOT NULL,
	"tokenHash" text NOT NULL,
	"invitedByUserId" text NOT NULL,
	"expiresAt" timestamp(3) NOT NULL,
	"acceptedAt" timestamp(3),
	"revokedAt" timestamp(3),
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "processing_event" (
	"id" text PRIMARY KEY NOT NULL,
	"meetingId" text NOT NULL,
	"stage" "ProcessingStage" NOT NULL,
	"status" "ProcessingEventStatus" NOT NULL,
	"message" text,
	"metadata" jsonb,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meeting" (
	"id" text PRIMARY KEY NOT NULL,
	"workspaceId" text NOT NULL,
	"userId" text NOT NULL,
	"title" text NOT NULL,
	"source" "MeetingSource" DEFAULT 'UPLOAD' NOT NULL,
	"status" "MeetingStatus" DEFAULT 'PENDING_UPLOAD' NOT NULL,
	"audioKey" text,
	"fileName" text,
	"fileType" text,
	"fileSize" integer,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"durationSeconds" integer,
	"language" text,
	"summary" jsonb,
	"deletedAt" timestamp(3),
	"isShared" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp(3),
	"refreshTokenExpiresAt" timestamp(3),
	"scope" text,
	"password" text,
	"createdAt" timestamp(3) NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp(3) NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp(3) NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspace_member" (
	"id" text PRIMARY KEY NOT NULL,
	"workspaceId" text NOT NULL,
	"userId" text NOT NULL,
	"role" "WorkspaceRole" DEFAULT 'MEMBER' NOT NULL,
	"joinedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transcript_segment" (
	"id" text PRIMARY KEY NOT NULL,
	"meetingId" text NOT NULL,
	"speaker" text,
	"startMs" integer NOT NULL,
	"endMs" integer NOT NULL,
	"text" text NOT NULL,
	"index" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "meeting_chunk" (
	"id" text PRIMARY KEY NOT NULL,
	"meetingId" text NOT NULL,
	"content" text NOT NULL,
	"startMs" integer NOT NULL,
	"endMs" integer NOT NULL,
	"embedding" vector(1536) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "task" (
	"id" text PRIMARY KEY NOT NULL,
	"workspaceId" text NOT NULL,
	"meetingId" text,
	"title" text NOT NULL,
	"assigneeId" text,
	"isCompleted" boolean DEFAULT false NOT NULL,
	"dueAt" timestamp(3),
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_invitedByUserId_fkey" FOREIGN KEY ("invitedByUserId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "processing_event" ADD CONSTRAINT "processing_event_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "public"."meeting"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "meeting" ADD CONSTRAINT "meeting_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "meeting" ADD CONSTRAINT "meeting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "workspace_member" ADD CONSTRAINT "workspace_member_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "workspace_member" ADD CONSTRAINT "workspace_member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "transcript_segment" ADD CONSTRAINT "transcript_segment_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "public"."meeting"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "meeting_chunk" ADD CONSTRAINT "meeting_chunk_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "public"."meeting"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "public"."meeting"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT "task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_key" ON "user" USING btree ("email" text_ops);--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "user" USING btree ("id" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "workspace_slug_key" ON "workspace" USING btree ("slug" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "invitation_tokenHash_key" ON "invitation" USING btree ("tokenHash" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "invitation_workspaceId_email_key" ON "invitation" USING btree ("workspaceId" text_ops,"email" text_ops);--> statement-breakpoint
CREATE INDEX "invitation_workspaceId_idx" ON "invitation" USING btree ("workspaceId" text_ops);--> statement-breakpoint
CREATE INDEX "processing_event_meetingId_createdAt_idx" ON "processing_event" USING btree ("meetingId" text_ops,"createdAt" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "meeting_audioKey_key" ON "meeting" USING btree ("audioKey" text_ops);--> statement-breakpoint
CREATE INDEX "meeting_userId_idx" ON "meeting" USING btree ("userId" text_ops);--> statement-breakpoint
CREATE INDEX "meeting_workspaceId_createdAt_idx" ON "meeting" USING btree ("workspaceId" timestamp_ops,"createdAt" timestamp_ops);--> statement-breakpoint
CREATE INDEX "meeting_workspaceId_deletedAt_createdAt_idx" ON "meeting" USING btree ("workspaceId" timestamp_ops,"deletedAt" text_ops,"createdAt" timestamp_ops);--> statement-breakpoint
CREATE INDEX "session_expiresAt_idx" ON "session" USING btree ("expiresAt" timestamp_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "session_token_key" ON "session" USING btree ("token" text_ops);--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("userId" text_ops);--> statement-breakpoint
CREATE INDEX "workspace_member_userId_idx" ON "workspace_member" USING btree ("userId" text_ops);--> statement-breakpoint
CREATE INDEX "workspace_member_workspaceId_idx" ON "workspace_member" USING btree ("workspaceId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "workspace_member_workspaceId_userId_key" ON "workspace_member" USING btree ("workspaceId" text_ops,"userId" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "transcript_segment_meetingId_index_key" ON "transcript_segment" USING btree ("meetingId" int4_ops,"index" int4_ops);--> statement-breakpoint
CREATE INDEX "transcript_segment_meetingId_startMs_idx" ON "transcript_segment" USING btree ("meetingId" text_ops,"startMs" text_ops);--> statement-breakpoint
CREATE INDEX "meeting_chunk_meetingId_idx" ON "meeting_chunk" USING btree ("meetingId" text_ops);--> statement-breakpoint
CREATE INDEX "task_meetingId_idx" ON "task" USING btree ("meetingId" text_ops);--> statement-breakpoint
CREATE INDEX "task_workspaceId_isCompleted_createdAt_idx" ON "task" USING btree ("workspaceId" text_ops,"isCompleted" text_ops,"createdAt" text_ops);
*/