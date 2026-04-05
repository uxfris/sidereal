import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { TrashBin2 } from "@solar-icons/react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"
import { UserPlus } from "@solar-icons/react/ssr"
import { ActionItem } from "../_types/task"
import { cn } from "@workspace/ui/lib/utils"

export function TaskItem({ item, onToggle }: { item: ActionItem, onToggle: () => void }) {
    return (
        <div className="flex items-start gap-3 py-1 group/item">
            <Checkbox className="w-5 h-5 border-2" checked={item.isCompleted} onCheckedChange={onToggle} />
            <p className={cn("flex-1 line-clamp-2", item.isCompleted && "line-through text-muted-foreground")}>
                {item.title}
            </p>
            <Button variant="secondary" size="icon-xs" className="rounded-full opacity-0 group-hover/item:opacity-100">
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