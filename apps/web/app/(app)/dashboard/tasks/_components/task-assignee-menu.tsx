"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Input } from "@workspace/ui/components/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"
import { UserPlus } from "@solar-icons/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu"
import { UserSummary } from "../_types/task"
import { cn } from "@workspace/ui/lib/utils"

//Mock data
const assignees: UserSummary[] = [
    {
        id: "1",
        name: "Fris El",
        initials: "FE",
        avatarUrl: "https://assets.lummi.ai/assets/Qmeh9r8a3AE8dQyCTSLiqVKLgu6HKEvJWaEwxMUMyDqHn5?auto=format&w=150"
    },
    {
        id: "user-1",
        name: "Alice Johnson",
        initials: "AJ",
        avatarUrl: "https://i.pravatar.cc/150?img=1"
    }
]

type TaskAssigneeMenuProps = {
    children: React.ReactNode
    assigneeId?: string
    tooltip: string
    onUpdateAssignee: (assignee?: UserSummary) => void
}

export function TaskAssigneeMenu({ children, tooltip, onUpdateAssignee, assigneeId }: TaskAssigneeMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <span className="cursor-pointer">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {children}
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>{tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="sm:min-w-52 space-y-2 p-2">
                <Input
                    placeholder="Name or Email" />
                <DropdownMenuItem className="py-2" onSelect={() => onUpdateAssignee()}>
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                        <UserPlus />
                    </div>
                    <p>Unassign</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {assignees.map((assignee) =>
                    <div key={assignee.id}>
                        <DropdownMenuItem className={cn("py-2", assignee.id === assigneeId && "bg-secondary")} onSelect={() => onUpdateAssignee(assignee)}>
                            <Avatar size="sm">
                                <AvatarImage src={assignee.avatarUrl}
                                />
                                <AvatarFallback>{assignee.initials}</AvatarFallback>
                            </Avatar>
                            <p>{assignee.name}</p>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </div>
                )}


            </DropdownMenuContent>
        </DropdownMenu>
    )
}