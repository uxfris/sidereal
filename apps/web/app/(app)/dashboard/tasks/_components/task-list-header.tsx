import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Check, Copy } from "lucide-react"
import { formatDate } from "@workspace/ui/lib/date-format"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"
import { cn } from "@workspace/ui/lib/utils"
import { useState } from "react"
import { ActionItem, UserSummary } from "@workspace/types/task"
import { TaskSync } from "./task-sync"
import { SendTaskSelectionDialog } from "./send-task-selection-dialog"
import { SendTaskDialog } from "./send-task-dialog"
import { toast } from "sonner"



type TaskListHeaderProps = {
    title: string
    timestamp: string
    tasks: ActionItem[]
    onUpdateAssignee: (itemId: string, assignee: UserSummary | null) => void
}

export function TaskListHeader({ title, timestamp, tasks, onUpdateAssignee }: TaskListHeaderProps) {
    const [taskSelectionOpen, setTaskSelectionOpen] = useState(false)
    const [areInitiallySelected, setAreInitiallySelected] = useState(false)
    const [selectedTaskIds, setSelectedTaskIds] = useState<String[]>([])
    const [taskSendOpen, setTaskSendOpen] = useState(false)


    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        const text = tasks.map(task => task.title).join("\n")
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    const onOpenTaskSelection = (state: boolean) => {
        setAreInitiallySelected(state)
        setTaskSelectionOpen(true)
    }

    const onContinue = (selectedTaskIds: string[]) => {
        setSelectedTaskIds(selectedTaskIds)
        setTaskSelectionOpen(false)
        setTaskSendOpen(true)
    }

    const onSuccess = () => {
        //TODO: change the platform
        setTaskSendOpen(false)
        toast.success("Tasks sent to Trello")
    }


    return (
        <div className="w-full flex items-center">
            <div className="bg-primary self-stretch w-1 rounded-full" aria-hidden={true} />
            <div className="w-full pl-4">
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold truncate">{title}</h2>
                        <Badge variant="secondary" className="text-muted-foreground">{tasks.length} items</Badge>
                        {tasks.length > 0 && <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="opacity-0 group-hover/task:opacity-100 transition-opacity duration-300"
                                    onClick={handleCopy}
                                >
                                    <span className="relative w-4 h-4">
                                        <Copy className={cn("absolute transition-all duration-200", copied ? "scale-0 opacity-0" : "scale-100 opacity-100")} />
                                        <Check className={cn("absolute transition-all duration-200", copied ? "scale-100 opacity-100" : "scale-0 opacity-0")} />
                                    </span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Copy {tasks.length} items</p>
                            </TooltipContent>
                        </Tooltip>}
                    </div>
                    <TaskSync openTaskSelectionDialog={(areInitiallySelected) => onOpenTaskSelection(areInitiallySelected)} />
                </div>
                <time dateTime={timestamp} className="text-xs text-muted-foreground">
                    {formatDate(timestamp)}
                </time>
            </div>
            <SendTaskSelectionDialog
                open={taskSelectionOpen}
                onOpenChange={setTaskSelectionOpen}
                initialSelectedTasksIds={areInitiallySelected ? tasks.map(t => t.id) : undefined}
                onContinue={onContinue}
                tasks={tasks}
                onUpdateAssignee={onUpdateAssignee}
            />
            <SendTaskDialog open={taskSendOpen} onOpenChange={setTaskSendOpen} onSuccess={onSuccess} tasks={tasks.filter((t) => selectedTaskIds.includes(t.id))} />
        </div>
    )
}