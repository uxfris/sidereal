import {
  getActiveWorkspaceId,
  setActiveWorkspaceId,
} from "@workspace/api-client"
import type { WorkspaceMembership } from "@workspace/types"

/**
 * Returns the currently selected workspace id persisted in the browser.
 */
export function getCurrentWorkspaceId(): string | null {
  return getActiveWorkspaceId()
}

/**
 * Persists the selected workspace id and updates API client headers.
 */
export function setCurrentWorkspaceId(workspaceId: string | null): void {
  setActiveWorkspaceId(workspaceId)
}

/**
 * Resolves the best workspace selection order for initial load.
 */
export function resolveInitialWorkspaceId(input: {
  workspaces: WorkspaceMembership[]
  activeWorkspaceId: string | null
  persistedWorkspaceId: string | null
}): string {
  const { workspaces, activeWorkspaceId, persistedWorkspaceId } = input

  return (
    workspaces.find((item) => item.id === persistedWorkspaceId)?.id ||
    activeWorkspaceId ||
    workspaces[0]?.id ||
    ""
  )
}
