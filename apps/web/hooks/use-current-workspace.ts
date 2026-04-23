"use client"

import { create } from "zustand"
import { getCurrentWorkspaceId, setCurrentWorkspaceId } from "@/lib/workspace"

type CurrentWorkspaceState = {
  workspaceId: string | null
  setWorkspaceId: (workspaceId: string | null) => void
}

export const useCurrentWorkspaceStore = create<CurrentWorkspaceState>((set) => ({
  workspaceId: getCurrentWorkspaceId(),
  setWorkspaceId: (workspaceId) => {
    setCurrentWorkspaceId(workspaceId)
    set({ workspaceId })
  },
}))

export function useCurrentWorkspace() {
  const workspaceId = useCurrentWorkspaceStore((state) => state.workspaceId)
  const setWorkspaceId = useCurrentWorkspaceStore((state) => state.setWorkspaceId)

  return { workspaceId, setWorkspaceId }
}
