import { randomBytes } from "node:crypto"
import { prisma } from "@workspace/database"

const MAX_SLUG_ATTEMPTS = 5
const PRISMA_UNIQUE_CONSTRAINT = "P2002"

function slugify(input: string): string {
  const cleaned = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)

  return cleaned || "workspace"
}

function randomSuffix(length = 6): string {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length)
}

function buildWorkspaceName(user: {
  name?: string | null
  email: string
}): string {
  const source = user.name?.trim() || user.email.split("@")[0] || "My"
  const firstName = source.split(/\s+/)[0] ?? source
  return `${firstName}'s Workspace`
}

/**
 * Creates a personal workspace for a newly registered user and adds them as OWNER.
 * Idempotent: if the user already belongs to any workspace, this is a no-op. This
 * lets us safely call it from BetterAuth hooks *and* from a "healing" path at login.
 */
export async function ensurePersonalWorkspace(user: {
  id: string
  name?: string | null
  email: string
}): Promise<void> {
  const existingMembership = await prisma.workspaceMember.findFirst({
    where: { userId: user.id },
    select: { id: true },
  })

  if (existingMembership) return

  const name = buildWorkspaceName(user)
  const baseSlug = slugify(name)

  for (let attempt = 0; attempt < MAX_SLUG_ATTEMPTS; attempt++) {
    const slug = `${baseSlug}-${randomSuffix(6)}`
    try {
      await prisma.$transaction(async (tx) => {
        const workspace = await tx.workspace.create({
          data: { name, slug },
        })
        await tx.workspaceMember.create({
          data: {
            workspaceId: workspace.id,
            userId: user.id,
            role: "OWNER",
          },
        })
      })
      return
    } catch (err) {
      const code = (err as { code?: string }).code
      const isLastAttempt = attempt === MAX_SLUG_ATTEMPTS - 1
      if (code === PRISMA_UNIQUE_CONSTRAINT && !isLastAttempt) continue
      throw err
    }
  }
}
