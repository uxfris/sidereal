"use client"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@workspace/ui/components/collapsible"
import { Plus } from "lucide-react"
import { AltArrowDown } from "@solar-icons/react"
import { cn } from "@workspace/ui/lib/utils"

import { TaskListHeader } from "./task-list-header"
import { TaskItem } from "./task-item"
import { NewTaskRow } from "./new-task-row"
import { useTaskList } from "../_hooks/use-task-list"
import { TasksGroup, UserSummary } from "@workspace/types/task"

export function TaskList({ tasksGroup, assignees }: { tasksGroup: TasksGroup, assignees: UserSummary[] }) {
    const {
        tasks,
        isAdding,
        setIsAdding,
        newTaskTitle,
        setNewTaskTitle,
        temporaryChecked,
        setTemporaryChecked,
        temporaryAssignee,
        setTemporaryAssignee,
        collapsibleOpen,
        setCollapsibleOpen,
        newTaskRowRef,
        incompleteTasks,
        completedTasks,
        toggleTask,
        addTask,
        deleteTask,
        updateTaskTitle,
        updateAssignee
    } = useTaskList(tasksGroup)

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault()
            addTask()
        }
        if (e.key === "Escape") {
            e.preventDefault()
            setIsAdding(false)
            setNewTaskTitle("")
            setTemporaryChecked(false)
        }
    }

    const showCard = tasks.length > 0 || isAdding

    return (
        <div className="space-y-4 group/task">
            <TaskListHeader
                title={tasksGroup.title}
                timestamp={tasksGroup.timestamp}
                tasks={tasks}
            />

            {showCard && (
                <Card>
                    <CardContent>
                        {incompleteTasks.map((item) => (
                            <TaskItem
                                key={item.id}
                                item={item}
                                assignees={assignees}
                                onToggle={() => toggleTask(item.id)}
                                onDelete={() => deleteTask(item.id)}
                                onUpdateTitle={(title) => updateTaskTitle(item.id, title)}
                                onUpdateAssignee={(assignee) => updateAssignee(item.id, assignee)}
                            />
                        ))}

                        {isAdding && (
                            <NewTaskRow
                                rowRef={newTaskRowRef}
                                assignees={assignees}
                                title={newTaskTitle}
                                checked={temporaryChecked}
                                onCheckedChange={setTemporaryChecked}
                                assignee={temporaryAssignee}
                                onAssigneeChange={setTemporaryAssignee}
                                onTitleChange={setNewTaskTitle}
                                onKeyDown={handleKeyDown}
                            />
                        )}

                        {completedTasks.length > 0 && (
                            <Collapsible
                                open={collapsibleOpen}
                                onOpenChange={setCollapsibleOpen}
                                className="space-y-1"
                            >
                                <CollapsibleTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="xs"
                                        className="bg-transparent aria-expanded:bg-transparent"
                                    >
                                        <AltArrowDown
                                            className={cn(
                                                "transition-all duration-200 rotate-0",
                                                collapsibleOpen && "rotate-180"
                                            )}
                                        />
                                        <span>{completedTasks.length} Completed</span>
                                    </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    {completedTasks.map((item) => (
                                        <TaskItem
                                            key={item.id}
                                            item={item}
                                            assignees={assignees}
                                            onToggle={() => toggleTask(item.id)}
                                            onDelete={() => deleteTask(item.id)}
                                            onUpdateTitle={(title) => updateTaskTitle(item.id, title)}
                                            onUpdateAssignee={(assignee) => updateAssignee(item.id, assignee)}
                                        />
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        )}
                    </CardContent>
                </Card>
            )}

            <Button variant="ghost" onClick={() => setIsAdding(true)}>
                <Plus /> New Task
            </Button>
        </div>
    )
}