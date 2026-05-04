import { relations } from "drizzle-orm/relations";
import { workspace, invitation, user, meeting, processingEvent, account, session, workspaceMember, transcriptSegment, meetingChunk, task } from "./schema";

export const invitationRelations = relations(invitation, ({one}) => ({
	workspace: one(workspace, {
		fields: [invitation.workspaceId],
		references: [workspace.id]
	}),
	user: one(user, {
		fields: [invitation.invitedByUserId],
		references: [user.id]
	}),
}));

export const workspaceRelations = relations(workspace, ({many}) => ({
	invitations: many(invitation),
	meetings: many(meeting),
	workspaceMembers: many(workspaceMember),
	tasks: many(task),
}));

export const userRelations = relations(user, ({many}) => ({
	invitations: many(invitation),
	meetings: many(meeting),
	accounts: many(account),
	sessions: many(session),
	workspaceMembers: many(workspaceMember),
	tasks: many(task),
}));

export const processingEventRelations = relations(processingEvent, ({one}) => ({
	meeting: one(meeting, {
		fields: [processingEvent.meetingId],
		references: [meeting.id]
	}),
}));

export const meetingRelations = relations(meeting, ({one, many}) => ({
	processingEvents: many(processingEvent),
	workspace: one(workspace, {
		fields: [meeting.workspaceId],
		references: [workspace.id]
	}),
	user: one(user, {
		fields: [meeting.userId],
		references: [user.id]
	}),
	transcriptSegments: many(transcriptSegment),
	meetingChunks: many(meetingChunk),
	tasks: many(task),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const workspaceMemberRelations = relations(workspaceMember, ({one}) => ({
	workspace: one(workspace, {
		fields: [workspaceMember.workspaceId],
		references: [workspace.id]
	}),
	user: one(user, {
		fields: [workspaceMember.userId],
		references: [user.id]
	}),
}));

export const transcriptSegmentRelations = relations(transcriptSegment, ({one}) => ({
	meeting: one(meeting, {
		fields: [transcriptSegment.meetingId],
		references: [meeting.id]
	}),
}));

export const meetingChunkRelations = relations(meetingChunk, ({one}) => ({
	meeting: one(meeting, {
		fields: [meetingChunk.meetingId],
		references: [meeting.id]
	}),
}));

export const taskRelations = relations(task, ({one}) => ({
	workspace: one(workspace, {
		fields: [task.workspaceId],
		references: [workspace.id]
	}),
	meeting: one(meeting, {
		fields: [task.meetingId],
		references: [meeting.id]
	}),
	user: one(user, {
		fields: [task.assigneeId],
		references: [user.id]
	}),
}));