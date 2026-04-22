 "use client"

import { Bolt, Settings, UserPlusRounded } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Badge } from "@workspace/ui/components/badge"
import { ChevronDown, Plus, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@workspace/ui/components/sidebar";
import Link from "next/link";
import { CreditLeftCard } from "@/components/credit-left-card";
import LogoIcon from "@/assets/icons/logo-icon";
import { Field, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { workspaceApi } from "@workspace/api-client";
import type { WorkspaceMembership } from "@workspace/types";

const ACTIVE_WORKSPACE_KEY = "active_workspace_id"

function getInitial(name: string): string {
    return name.trim().charAt(0).toUpperCase() || "W"
}

export function WorkspaceSwitcher() {
    const [workspace, setWorkspace] = React.useState("")
    const [workspaces, setWorkspaces] = useState<WorkspaceMembership[]>([])
    const [loading, setLoading] = useState(true)
    const [creating, setCreating] = useState(false)
    const [newWorkspaceName, setNewWorkspaceName] = useState("")
    const [error, setError] = useState<string | null>(null)

    const activeWorkspace = useMemo(
        () => workspaces.find((item) => item.id === workspace) ?? workspaces[0],
        [workspace, workspaces]
    )

    useEffect(() => {
        let mounted = true

        async function load() {
            try {
                const data = await workspaceApi.getMe()
                if (!mounted) return

                setWorkspaces(data.workspaces)

                const persisted =
                    typeof window !== "undefined"
                        ? window.localStorage.getItem(ACTIVE_WORKSPACE_KEY)
                        : null

                const selectedId =
                    data.workspaces.find((item) => item.id === persisted)?.id ||
                    data.activeWorkspaceId ||
                    data.workspaces[0]?.id ||
                    ""

                setWorkspace(selectedId)
            } catch {
                if (!mounted) return
                setError("Unable to load your workspaces.")
            } finally {
                if (mounted) setLoading(false)
            }
        }

        load()

        return () => {
            mounted = false
        }
    }, [])

    const [newWorkspaceOpen, setNewWorkspaceOpen] = useState(false)

    function handleWorkspaceChange(nextWorkspaceId: string) {
        setWorkspace(nextWorkspaceId)
        if (typeof window !== "undefined") {
            window.localStorage.setItem(ACTIVE_WORKSPACE_KEY, nextWorkspaceId)
        }
    }

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
            setWorkspaces((curr) => [next, ...curr])
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
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="bg-background py-3">
                            <div className="flex aspect-square size-8 items-center justify-center">
                                <span className="flex items-center justify-center rounded-[4px] bg-primary text-primary-foreground size-6 text-center text-xs font-medium -ml-4" aria-hidden="true">
                                    {getInitial(activeWorkspace?.name ?? "Workspace")}
                                </span>
                            </div>
                            <span className="flex-1 truncate font-medium group-data-[state=collapsed]:hidden">
                                {activeWorkspace?.name ?? "Workspace"}
                            </span>
                            <ChevronDown className="ml-auto group-data-[state=collapsed]:hidden" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="py-2 shadow-md ring-border " >
                        <div className="flex flex-col items-center gap-4 px-1">
                            {/* Workspace */}
                            <div className="flex items-center w-full gap-3">
                                {/* Avatar */}
                                <div className="flex items-center justify-center rounded-[4px] bg-primary text-primary-foreground w-9 h-9 text-center font-medium" aria-hidden="true">
                                    {getInitial(activeWorkspace?.name ?? "Workspace")}
                                </div>
                                {/* Workspace name */}
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-medium">{activeWorkspace?.name ?? "Workspace"}</span>
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="text-xs text-muted-foreground">Free Plan</span>
                                        <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                                        <span className="text-xs text-muted-foreground">1 member</span>
                                    </div>
                                </div>
                            </div>
                            {/* Menu */}
                            <div className="flex items-center gap-1 w-full">
                                <Link href="/settings/workspace">
                                    <Button size="xs" variant="ghost" className="px-2 text-[11px]" >
                                        <span> <Settings /></span>
                                        Settings</Button>
                                </Link>
                                <Link href="/settings/people?invite=true">
                                    <Button size="xs" variant="ghost" className="px-2 text-[11px]">
                                        <UserPlusRounded />
                                        Invite members</Button>
                                </Link>
                            </div>
                        </div>
                        <DropdownMenuSeparator className="my-2" />
                        {/* Credit */}
                        <div className="flex flex-col gap-2 px-1">
                            {/* Upgrade button. Visibility depends on the workspace ownerships*/}
                            <div className="flex items-center justify-between p-3 bg-secondary rounded-sm">
                                <div className="flex items-center gap-1">
                                    <Bolt weight="Bold" size={20} />
                                    <span className="text-sm font-medium">Turn Pro</span>
                                </div>
                                <Button size="sm">Upgrade</Button>
                            </div>
                            {/* Credit left */}
                            <CreditLeftCard />
                        </div>
                        <DropdownMenuSeparator className="my-2" />
                        {/* Workspaces */}
                        <div className="flex flex-col gap-3 py-2">
                            <DropdownMenuLabel className="px-4">All workspace</DropdownMenuLabel>
                            <DropdownMenuRadioGroup value={workspace} onValueChange={handleWorkspaceChange}>
                                {loading && <p className="px-4 text-xs text-muted-foreground">Loading...</p>}
                                {!loading && workspaces.length === 0 && (
                                    <p className="px-4 text-xs text-muted-foreground">No workspace yet.</p>
                                )}
                                {!loading && workspaces.map((item) => (
                                    <DropdownMenuRadioItem key={item.id} value={item.id} className="mx-1 px-2 py-2">
                                        <div className="flex items-center gap-2">
                                            <span className="flex items-center justify-center rounded-[4px] bg-primary text-primary-foreground! w-6 h-6 text-center text-xs font-medium" aria-hidden="true">
                                                {getInitial(item.name)}
                                            </span>
                                            <span className="text-xs">{item.name}</span>
                                            {item.role === "OWNER" && <Badge variant="secondary">Owner</Badge>}
                                        </div>
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>

                        </div>
                        <DropdownMenuSeparator className="my-2" />
                        <DropdownMenuItem className="gap-3 mx-1 px-2 py-2" onSelect={() => setNewWorkspaceOpen(true)}>
                            <span className="flex items-center justify-center w-6 h-6 bg-accent brightness-95 text-muted-foreground rounded-sm"><Plus size={16} /></span>
                            <span className="text-xs">Create new workspace</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
            {newWorkspaceOpen && <div className="fixed z-50 inset-0 bg-background flex items-center justify-center">
                <div className="flex flex-col gap-6 max-w-xs">
                    <Button variant="ghost" className="absolute top-6 right-4" onClick={() => setNewWorkspaceOpen(false)}>
                        <X />
                    </Button>
                    <LogoIcon className="h-12 w-12 text-primary" />
                    <h1 className="text-3xl font-semibold">Create a workspace</h1>
                    <p className="text-sm">Create a new place to make meetings or collaborate with others.</p>
                    <Field>
                        <FieldLabel>
                            Workspace name
                        </FieldLabel>
                        <Input
                            placeholder="Enter workspace name"
                            value={newWorkspaceName}
                            onChange={(event) => setNewWorkspaceName(event.target.value)}
                        />
                    </Field>
                    {error && <p className="text-xs text-destructive">{error}</p>}
                    <div className="flex items-center gap-3">
                        <Button variant="secondary" className="flex-1" onClick={() => setNewWorkspaceOpen(false)}>
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
            </div>}
        </SidebarMenu >
    )
}