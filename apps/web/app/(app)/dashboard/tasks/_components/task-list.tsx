"use client"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { ArrowRightLeft, Check, Copy, Plus } from "lucide-react"
import { AltArrowDown } from "@solar-icons/react"
import { TaskItem } from "./task-item"
import { TaskGroup } from "../_types/task"
import { formatDate } from "@workspace/ui/lib/date-format"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"
import { useState } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"



export function TaskList({ tasksGroup }: { tasksGroup: TaskGroup }) {
    const [copied, setCopied] = useState(false)
    const [collapsibleOpen, setCollapsibleOpen] = useState(false)

    const handleCopy = async () => {
        const text = tasksGroup.tasks.map(task => task.title).join("\n")
        await navigator.clipboard.writeText(text)

        setCopied(true)

        setTimeout(() => setCopied(false), 1500)


    }

    return (
        <div className="space-y-4 group/task">
            {/* Header */}
            <div className="w-full flex items-center">
                <div className="bg-primary self-stretch w-1 rounded-full" aria-hidden={true} />
                <div className="w-full pl-4">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold truncate">{tasksGroup.title}</h2>
                            <Badge variant="secondary" className="text-muted-foreground">{tasksGroup.tasks.length} items</Badge>
                            <Tooltip>
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
                                    <p>Copy {tasksGroup.tasks.length} items</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <Button variant="secondary" className="hidden md:flex">
                            <ArrowRightLeft />
                            Sync to
                        </Button>
                    </div>
                    <time dateTime={tasksGroup.timestamp} className="text-xs text-muted-foreground">{formatDate(tasksGroup.timestamp)}</time>
                </div>
            </div>
            {/* Item Action Card */}
            <Card>
                <CardContent>
                    {
                        tasksGroup.tasks.filter((item => !item.isCompleted)).map((item) => (<TaskItem key={item.id} item={item} />))
                    }
                </CardContent>
            </Card>
            {tasksGroup.tasks.filter((item => item.isCompleted)).length > 0 && <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen} className="space-y-1">
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="xs" className="bg-transparent aria-expanded:bg-transparent">
                        <AltArrowDown className={cn("transition-all duration-200 rotate-0", collapsibleOpen && "rotate-180")} />
                        <span >1 Completed</span>
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <Card>
                        <CardContent>
                            {/* Item Actions List*/}
                            {
                                tasksGroup.tasks.filter((item => item.isCompleted)).map((item) =>
                                    (<TaskItem key={item.id} item={item} />))
                            }
                        </CardContent>
                    </Card>
                </CollapsibleContent>
            </Collapsible>}

            <Button variant="ghost"><Plus /> New Task</Button>
        </div>
    )
}

