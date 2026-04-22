"use client"

import { Button } from "@workspace/ui/components/button"
import { X } from "lucide-react"
import React, { useState } from "react"
import LogoIcon from "@/assets/icons/logo-icon"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { workspaceApi } from "@workspace/api-client"
import { WorkspaceMembership } from "@workspace/types"

export function NewWorkspacePage({
  setWorkspaces,
  handleWorkspaceChange,
  setNewWorkspaceOpen,
}: {
  setWorkspaces: (next: WorkspaceMembership) => void
  handleWorkspaceChange: (id: string) => void
  setNewWorkspaceOpen: (open: boolean) => void
}) {
  const [creating, setCreating] = useState(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState("")
  const [error, setError] = useState<string | null>(null)

  async function handleCreateWorkspace() {
    const name = newWorkspaceName.trim()
    if (!name) return

    setCreating(true)
    setError(null)
    try {
      const created = await workspaceApi.create(name)
      const next: WorkspaceMembership = {
        ...created,
        role: "OWNER",
        joinedAt: new Date().toISOString(),
      }
      setWorkspaces(next)
      handleWorkspaceChange(created.id)
      setNewWorkspaceName("")
      setNewWorkspaceOpen(false)
    } catch {
      setError("Failed to create workspace.")
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex max-w-xs flex-col gap-6">
        <Button
          variant="ghost"
          className="absolute top-6 right-4"
          onClick={() => setNewWorkspaceOpen(false)}
        >
          <X />
        </Button>
        <LogoIcon className="h-12 w-12 text-primary" />
        <h1 className="text-3xl font-semibold">Create a workspace</h1>
        <p className="text-sm">
          Create a new place to make meetings or collaborate with others.
        </p>
        <Field>
          <FieldLabel>Workspace name</FieldLabel>
          <Input
            placeholder="Enter workspace name"
            value={newWorkspaceName}
            onChange={(event) => setNewWorkspaceName(event.target.value)}
          />
        </Field>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => setNewWorkspaceOpen(false)}
          >
            Go back
          </Button>
          <Button
            className="flex-1"
            onClick={handleCreateWorkspace}
            disabled={creating || newWorkspaceName.trim().length === 0}
          >
            {creating ? "Creating..." : "Create workspace"}
          </Button>
        </div>
      </div>
    </div>
  )
}
