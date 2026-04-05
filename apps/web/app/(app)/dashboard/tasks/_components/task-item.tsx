

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { TrashBin2 } from "@solar-icons/react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"
import { UserPlus } from "@solar-icons/react"
import { ActionItem } from "../_types/task"
import { cn } from "@workspace/ui/lib/utils"
import { useEffect, useRef, useState } from "react"
import { Input } from "@workspace/ui/components/input"

type TaskItemProps = {
    item: ActionItem
    onToggle: () => void
    onDelete: () => void
    onUpdateTitle: (title: string) => void

}

export function TaskItem({ item, onToggle, onDelete, onUpdateTitle }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(item.title)
    const inputRef = useRef<HTMLInputElement>(null)

    const save = () => {
        const trimmed = title.trim()

        if (!trimmed) {
            onDelete()
            return
        }

        if (trimmed != item.title) {
            onUpdateTitle(trimmed)
        }
        setIsEditing(false)

    }
    const cancel = () => {
        setTitle(item.title)
        setIsEditing(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter") {
            e.preventDefault()
            save()
        }
        if (e.key === "Escape") {
            e.preventDefault()
            cancel()
        }
    }

    useEffect(() => {
        setTitle(item.title)
    }, [item.title])


    return (
        <div className="flex items-start gap-3 py-1 group/item">
            <Checkbox className="w-5 h-5 border-2" checked={item.isCompleted} onCheckedChange={onToggle} />
            {isEditing ?
                <Input
                    ref={inputRef}
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={save}
                    onKeyDown={handleKeyDown}
                    className="h-fit p-0 bg-transparent"
                />
                :
                <p onClick={() => setIsEditing(true)} className={cn("flex-1 cursor-pointer line-clamp-2", item.isCompleted && "line-through text-muted-foreground")}>
                    {item.title}
                </p>}
            <Button
                variant="secondary"
                size="icon-xs"
                onClick={onDelete}
                className="rounded-full opacity-0 group-hover/item:opacity-100"
            >
                <TrashBin2 size={1} className="mt-1 text-destructive" />
            </Button>
            {item.assignee && <Tooltip>
                <TooltipTrigger asChild>
                    <Avatar>
                        <AvatarImage src={item.assignee.avatarUrl} />
                        <AvatarFallback>{item.assignee.initials}</AvatarFallback>
                    </Avatar>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>{item.assignee.name}</p>
                </TooltipContent>
            </Tooltip>}
            {!item.assignee && <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="secondary" size="icon-xs" className="rounded-full ">
                        <UserPlus />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>Add assignee</p>
                </TooltipContent>
            </Tooltip>}

        </div>
    )
}