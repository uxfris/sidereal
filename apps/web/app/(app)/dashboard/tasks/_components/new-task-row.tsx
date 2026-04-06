"use client"

import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { UserPlus } from "@solar-icons/react"
import type { RefObject } from "react"
import { UserSummary } from "@workspace/types/task"
import { TaskAssigneeMenu } from "./task-assignee-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"

type NewTaskRowProps = {
    rowRef: RefObject<HTMLDivElement | null>
    title: string
    checked: boolean
    assignee: UserSummary | null,
    assignees: UserSummary[]
    onCheckedChange: (checked: boolean) => void
    onTitleChange: (value: string) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    onAssigneeChange: (assignee: UserSummary | null) => void
}

export function NewTaskRow({
    rowRef,
    title,
    checked,
    onCheckedChange,
    onTitleChange,
    onKeyDown,
    assignee,
    onAssigneeChange,
    assignees

}: NewTaskRowProps) {
    return (
        <div ref={rowRef} className="flex items-start gap-3 py-1 group/item">
            <Checkbox
                className="w-5 h-5 border-2"
                checked={checked}
                onCheckedChange={() => onCheckedChange(!checked)}
            />
            <Input
                autoFocus
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Enter task"
                className="p-0 h-fit bg-transparent"
            />
            {assignee ? (
                <TaskAssigneeMenu tooltip={assignee.name} onUpdateAssignee={onAssigneeChange} assigneeId={assignee.id} assignees={assignees}>
                    <Avatar>
                        <AvatarImage src={assignee.avatarUrl} />
                        <AvatarFallback>{assignee.initials}</AvatarFallback>
                    </Avatar>
                </TaskAssigneeMenu>
            ) : (
                <TaskAssigneeMenu tooltip="Add assignee" onUpdateAssignee={onAssigneeChange} assignees={assignees}>
                    <Button variant="secondary" size="icon-xs" className="rounded-full">
                        <UserPlus />
                    </Button>
                </TaskAssigneeMenu>
            )}
        </div>
    )
}