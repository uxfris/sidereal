import { z } from "zod"

/* ---------------------------------- */
/* Enums */
/* ---------------------------------- */

export const WorkspaceRoleSchema = z.enum(["owner", "admin", "member", "guest"])

export type WorkspaceRole = z.infer<typeof WorkspaceRoleSchema>

/* ---------------------------------- */
/* Member Row */
/* ---------------------------------- */

export const WorkspaceMemberSchema = z.object({
  id: z.string(),

  name: z.string(),

  email: z.email(),

  avatarUrl: z.string().nullable(),

  avatarInitials: z.string().min(1).max(3),

  role: WorkspaceRoleSchema,

  joinedAt: z.iso.datetime(),

  isCurrentUser: z.boolean().default(false),
})

export type WorkspaceMember = z.infer<typeof WorkspaceMemberSchema>

/* ---------------------------------- */
/* Table Data */
/* ---------------------------------- */

export const WorkspacePeopleTableSchema = z.array(WorkspaceMemberSchema)

export type WorkspacePeopleTable = z.infer<typeof WorkspacePeopleTableSchema>

export const WorkspacePeopleTableResponseSchema = z.object({
  people: WorkspacePeopleTableSchema,
})

/* ---------------------------------- */
/* Member Invitation Row */
/* ---------------------------------- */

export const WorkspaceMemberInvitationSchema = z.object({
  id: z.string(),

  name: z.string(),

  email: z.email(),

  avatarInitials: z.string().min(1).max(3),

  role: WorkspaceRoleSchema,

  invitedAt: z.iso.datetime(),
})

export type WorkspaceMemberInvitation = z.infer<
  typeof WorkspaceMemberInvitationSchema
>

/* ---------------------------------- */
/* Table Data */
/* ---------------------------------- */

export const WorkspacePeopleInvitationTableSchema = z.array(
  WorkspaceMemberInvitationSchema
)

export type WorkspacePeopleInvitationTable = z.infer<
  typeof WorkspacePeopleInvitationTableSchema
>
