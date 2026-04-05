"use client"

import { Checkbox } from "@workspace/ui/components/checkbox"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"
import { UserPlus } from "@solar-icons/react"
import type { RefObject } from "react"

type NewTaskRowProps = {
    rowRef: RefObject<HTMLDivElement | null>
    title: string
    checked: boolean
    onTitleChange: (value: string) => void
    onCheckedChange: (checked: boolean) => void
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export function NewTaskRow({
    rowRef,
    title,
    checked,
    onTitleChange,
    onCheckedChange,
    onKeyDown,
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
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="secondary" size="icon-xs" className="rounded-full">
                        <UserPlus />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>Add assignee</p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}