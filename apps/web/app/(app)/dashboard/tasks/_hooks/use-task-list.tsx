import { useState } from "react"
import { toast } from "sonner"
import type { ActionItem, TasksGroup, UserSummary } from "../../../../../../../packages/types/src/task"
import { taskApi as defaultTaskApi } from "../../../../../../../packages/api-client/src/task.api"
import { useNewTaskForm } from "./use-task-form"

// Injecting the api makes every action trivially unit-testable
// without jest.mock() or module-level mocking
interface UseTaskListOptions {
    api?: typeof defaultTaskApi
}

export function useTaskList(
    tasksGroup: TasksGroup,
    { api = defaultTaskApi }: UseTaskListOptions = {}
) {
    const [tasks, setTasks] = useState<ActionItem[]>(tasksGroup.tasks)
    const [collapsibleOpen, setCollapsibleOpen] = useState(false)

    // ─── Actions ──────────────────────────────────────────────────────────────

    async function toggleTask(id: string) {
        const prev = tasks.find((t) => t.id === id)
        if (!prev) return

        setTasks((curr) =>
            curr.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
        )

        try {
            await api.toggle(id, !prev.isCompleted)
        } catch {
            setTasks((curr) =>
                curr.map((t) => (t.id === id ? { ...t, isCompleted: prev.isCompleted } : t))
            )
            toast.error("Failed to update task. Please try again.")
        }
    }

    async function addTask(title: string, assignee: UserSummary | null, isCompleted: boolean) {
        const optimisticTask: ActionItem = {
            id: crypto.randomUUID(),
            title,
            isCompleted,
            assignee,
        }

        setTasks((curr) => [...curr, optimisticTask])

        try {
            await api.add(optimisticTask)
        } catch {
            setTasks((curr) => curr.filter((t) => t.id !== optimisticTask.id))
            toast.error("Failed to add task. Please try again.")
        }
    }

    async function deleteTask(id: string) {
        const index = tasks.findIndex((t) => t.id === id)
        const snapshot = tasks[index]
        if (!snapshot) return

        setTasks((curr) => curr.filter((t) => t.id !== id))

        toast("Task deleted", {
            position: "bottom-center",
            action: {
                label: "Undo",
                onClick: () => {
                    setTasks((curr) => {
                        const restored = [...curr]
                        restored.splice(index, 0, snapshot)
                        return restored
                    })
                },
            },
        })

        try {
            await api.remove(id)
        } catch {
            // Only rollback if the user didn't already undo
            setTasks((curr) => {
                if (curr.find((t) => t.id === id)) return curr
                const restored = [...curr]
                restored.splice(index, 0, snapshot)
                return restored
            })
            toast.error("Failed to delete task.")
        }
    }

    async function updateTaskTitle(id: string, title: string) {
        const prev = tasks.find((t) => t.id === id)
        if (!prev) return

        setTasks((curr) => curr.map((t) => (t.id === id ? { ...t, title } : t)))

        try {
            await api.updateTitle(id, title)
        } catch {
            setTasks((curr) => curr.map((t) => (t.id === id ? { ...t, title: prev.title } : t)))
            toast.error("Failed to update task title.")
        }
    }

    async function updateAssignee(id: string, assignee: UserSummary | null) {
        const prev = tasks.find((t) => t.id === id)
        if (!prev) return

        setTasks((curr) => curr.map((t) => (t.id === id ? { ...t, assignee } : t)))

        try {
            await api.updateAssignee(id, assignee)
        } catch {
            setTasks((curr) => curr.map((t) => (t.id === id ? { ...t, assignee: prev.assignee } : t)))
            toast.error("Failed to update assignee.")
        }
    }

    // ─── Form (delegates to useNewTaskForm) ───────────────────────────────────

    const form = useNewTaskForm({ onCommit: addTask })

    // ─── Derived ──────────────────────────────────────────────────────────────

    const incompleteTasks = tasks.filter((t) => !t.isCompleted)
    const completedTasks = tasks.filter((t) => t.isCompleted)

    return {
        // task state
        tasks,
        incompleteTasks,
        completedTasks,
        // ui state
        collapsibleOpen,
        setCollapsibleOpen,
        // actions
        toggleTask,
        addTask,
        deleteTask,
        updateTaskTitle,
        updateAssignee,
        // form (spread or pass as a group — consumer's choice)
        form,
    }
}