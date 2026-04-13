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
    TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { ReactNode } from "react"
import { ROLES } from "../../_lib/role-data"

export function PeopleRoleDropdownMenu({
    onSelectRole,
    triggerButton,
    hasHeader = false,
}: {
    onSelectRole: (role: string) => void
    triggerButton: ReactNode
    hasHeader?: boolean
}) {


    return (
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
                    <Tooltip key={item.id} >
                        <TooltipTrigger asChild>
                            <DropdownMenuItem
                                onSelect={() => onSelectRole?.(item.id)}
                                className="text-sm font-medium px-4 py-3 flex items-center justify-between gap-2">
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
    )
}