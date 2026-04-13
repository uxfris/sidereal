"use client"

import { Badge } from "@workspace/ui/components/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { ReactNode } from "react"

export function PeopleRoleDropdownMenu({
    triggerButton,
    hasHeader = false,
}: {
    triggerButton: ReactNode
    hasHeader?: boolean
}) {
    const ROLES = [
        {
            id: "owner",
            role: "Owner",
            isPro: false,
            description:
                "Full control over the workspace, including billing, integrations, and access to all meeting recordings and AI summaries.",
        },
        {
            id: "admin",
            role: "Admin",
            isPro: true,
            description:
                "Can manage members, control workspace settings, and access all shared meeting notes, recordings, and AI insights.",
        },
        {
            id: "member",
            role: "Member",
            isPro: false,
            description:
                "Can join meetings, view and collaborate on AI-generated notes, summaries, and action items they have access to.",
        },
        {
            id: "guest",
            role: "Guest",
            isPro: true,
            description:
                "Limited access to specific meetings, notes, and AI summaries shared with them. Ideal for external collaborators.",
        },
    ]

    return (
        <TooltipProvider>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {triggerButton}
                </DropdownMenuTrigger>

                <DropdownMenuContent className="min-w-fit">
                    {hasHeader && (
                        <>
                            <DropdownMenuLabel className="py-2">
                                Change role to
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                        </>
                    )}

                    {ROLES.map((item) => (
                        <Tooltip key={item.id}>
                            <TooltipTrigger asChild>
                                <DropdownMenuItem className="text-sm font-medium px-4 py-3 flex items-center justify-between gap-2">
                                    <span>{item.role}</span>

                                    {item.isPro && (
                                        <Badge variant="secondary">Pro</Badge>
                                    )}
                                </DropdownMenuItem>
                            </TooltipTrigger>

                            <TooltipContent side="right" className="border">
                                <p className="max-w-xs text-xs">{item.description}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </TooltipProvider>
    )
}