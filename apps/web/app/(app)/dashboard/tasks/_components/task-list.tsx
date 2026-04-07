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
import { TasksGroup } from "@workspace/types/task"

export function TaskList({ tasksGroup }: { tasksGroup: TasksGroup }) {
    const {
        tasks,
        collapsibleOpen,
        setCollapsibleOpen,
        incompleteTasks,
        completedTasks,
        toggleTask,
        deleteTask,
        updateTaskTitle,
        updateAssignee,
        form
    } = useTaskList(tasksGroup)

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault()
            form.commit()
        }
        if (e.key === "Escape") {
            e.preventDefault()
            form.reset()
        }
    }

    const showCard = tasksGroup.tasks.length > 0 || form.isAdding

    return (
        <div className="space-y-4 group/task">
            <TaskListHeader
                title={tasksGroup.title}
                timestamp={tasksGroup.timestamp}
                tasks={tasks}
                onUpdateAssignee={(id, assignee) => updateAssignee(id, assignee)}
            />

            {showCard && (
                <Card>
                    <CardContent>
                        {incompleteTasks.map((item) => (
                            <TaskItem
                                key={item.id}
                                item={item}
                                onToggle={() => toggleTask(item.id)}
                                onDelete={() => deleteTask(item.id)}
                                onUpdateTitle={(title) => updateTaskTitle(item.id, title)}
                                onUpdateAssignee={(assignee) => updateAssignee(item.id, assignee)}
                            />
                        ))}

                        {form.isAdding && (
                            <NewTaskRow
                                rowRef={form.newTaskRowRef}
                                title={form.newTaskTitle}
                                checked={form.temporaryChecked}
                                onCheckedChange={form.setTemporaryChecked}
                                assignee={form.temporaryAssignee}
                                onAssigneeChange={form.setTemporaryAssignee}
                                onTitleChange={form.setNewTaskTitle}
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

            <Button variant="ghost" onClick={() => form.setIsAdding(true)}>
                <Plus /> New Task
            </Button>
        </div>
    )
}