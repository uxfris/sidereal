"use client"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Plus } from "lucide-react"
import { AltArrowDown, UserPlus } from "@solar-icons/react"
import { TaskItem } from "./task-item"
import type { TaskGroup, ActionItem, UserSummary } from "../_types/task"
import { useEffect, useRef, useState } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"
import { TaskListHeader } from "./task-list-header"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip"
import { Input } from "@workspace/ui/components/input"
import { Checkbox } from "@workspace/ui/components/checkbox"



export function TaskList({ tasksGroup }: { tasksGroup: TaskGroup }) {
    const [tasks, setTasks] = useState(tasksGroup.tasks)

    const [isAdding, setIsAdding] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [temporaryAssignee, setTemporaryAssignee] = useState<UserSummary | null>(null)
    const [temporaryChecked, setTemporaryChecked] = useState(false)
    const [collapsibleOpen, setCollapsibleOpen] = useState(false)

    const newTaskRowRef = useRef<HTMLDivElement>(null)

    const toggleTasks = (id: string) => {
        setTasks(prev => prev.map(task => task.id === id
            ? { ...task, isCompleted: !task.isCompleted } : task
        ))
    }

    const addTask = () => {
        const trimmed = newTaskTitle.trim()
        if (!trimmed) {
            setIsAdding(false)
            setTemporaryChecked(false)
            setNewTaskTitle("")
            setTemporaryAssignee(null)
            return
        }

        const newTask: ActionItem = {
            id: crypto.randomUUID(),
            title: trimmed,
            isCompleted: temporaryChecked,
            assignee: temporaryAssignee
        }

        setTasks(prev => [...prev, newTask])
        setTemporaryChecked(false)
        setNewTaskTitle("")
        setTemporaryAssignee(null)
        setIsAdding(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addTask()
        }
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!newTaskRowRef.current) return
            if (!newTaskRowRef.current.contains(e.target as Node)) {
                addTask()
            }
        }
        if (isAdding) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isAdding, newTaskTitle, temporaryChecked, temporaryAssignee])




    return (
        <div className="space-y-4 group/task">
            {/* Header */}
            <TaskListHeader tasksGroup={tasksGroup} />
            {/* Item Action Card */}
            <Card>
                <CardContent>
                    {
                        tasks.filter((item => !item.isCompleted)).map((item) => (<TaskItem key={item.id} item={item} onToggle={() => toggleTasks(item.id)} />))
                    }

                    {isAdding && (
                        <div
                            ref={newTaskRowRef}
                            className="flex items-start gap-3 py-1 group/item">
                            <Checkbox className="w-5 h-5 border-2" checked={temporaryChecked} onCheckedChange={() => setTemporaryChecked(!temporaryChecked)} />
                            <Input
                                autoFocus
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter task"
                                className="p-0 h-fit bg-transparent" />
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
                    )}

                    {
                        tasks.filter((item => item.isCompleted)).length > 0 && <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen} className="space-y-1">
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="xs" className="bg-transparent aria-expanded:bg-transparent">
                                    <AltArrowDown className={cn("transition-all duration-200 rotate-0", collapsibleOpen && "rotate-180")} />
                                    <span >{tasks.filter(t => t.isCompleted).length} Completed</span>
                                </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                {/* Item Actions List*/}
                                {
                                    tasks.filter((item => item.isCompleted)).map((item) =>
                                        (<TaskItem key={item.id} item={item} onToggle={() => toggleTasks(item.id)} />))
                                }
                            </CollapsibleContent>
                        </Collapsible>
                    }
                </CardContent>
            </Card>
            <Button variant="ghost" onClick={() => setIsAdding(true)}><Plus /> New Task</Button>
        </div>
    )
}

