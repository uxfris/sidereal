import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import type { ActionItem, TasksGroup, UserSummary } from "../../../../../../../packages/types/src/task"
import { taskApi } from "../../../../../../../packages/api-client/src/task.api"

export function useTaskList(tasksGroup: TasksGroup) {
    const [tasks, setTasks] = useState<ActionItem[]>(tasksGroup.tasks)

    // — Adding state —
    const [isAdding, setIsAdding] = useState(false)
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [temporaryAssignee, setTemporaryAssignee] = useState<UserSummary | null>(null)
    const [temporaryChecked, setTemporaryChecked] = useState(false)
    const newTaskRowRef = useRef<HTMLDivElement>(null)

    // — Collapsible —
    const [collapsibleOpen, setCollapsibleOpen] = useState(false)

    // ─── Helpers ────────────────────────────────────────────────────────────────

    function resetAddForm() {
        setNewTaskTitle("")
        setTemporaryChecked(false)
        setTemporaryAssignee(null)
        setIsAdding(false)
    }

    // ─── Actions ─────────────────────────────────────────────────────────────────

    async function toggleTask(id: string) {
        const prev = tasks.find((t) => t.id === id)
        if (!prev) return

        // Optimistic update
        setTasks((curr) =>
            curr.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
        )

        try {
            await taskApi.toggle(id, !prev.isCompleted)
        } catch {
            // Rollback
            setTasks((curr) =>
                curr.map((t) => (t.id === id ? { ...t, isCompleted: prev.isCompleted } : t))
            )
            toast.error("Failed to update task. Please try again.")
        }
    }

    async function addTask() {
        const trimmed = newTaskTitle.trim()
        if (!trimmed) {
            resetAddForm()
            return
        }

        const optimisticTask: ActionItem = {
            id: crypto.randomUUID(),
            title: trimmed,
            isCompleted: temporaryChecked,
            assignee: temporaryAssignee,
        }

        // Optimistic update
        setTasks((curr) => [...curr, optimisticTask])
        resetAddForm()

        try {
            await taskApi.add(optimisticTask)
        } catch {
            // Rollback
            setTasks((curr) => curr.filter((t) => t.id !== optimisticTask.id))
            toast.error("Failed to add task. Please try again.")
        }
    }

    async function deleteTask(id: string) {
        const index = tasks.findIndex((t) => t.id === id)
        const snapshot = tasks[index]
        if (!snapshot) return

        // Optimistic update
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
            await taskApi.remove(id)
        } catch {
            // Rollback (only if undo wasn't already clicked)
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

        // Optimistic update
        setTasks((curr) => curr.map((t) => (t.id === id ? { ...t, title } : t)))

        try {
            await taskApi.updateTitle(id, title)
        } catch {
            // Rollback
            setTasks((curr) => curr.map((t) => (t.id === id ? { ...t, title: prev.title } : t)))
            toast.error("Failed to update task title.")
        }
    }

    async function updateAssignee(id: string, assignee?: UserSummary) {
        const prev = tasks.find((t) => t.id === id)
        if (!prev) return

        //Optimistic update
        setTasks((curr) => curr.map((t) => (t.id === id) ? { ...t, assignee: assignee ? assignee : null } : t))

        try {
            await taskApi.updateAssignee(id, assignee)
        } catch (error) {
            //Rollback
            setTasks((curr) => curr.map((t) => (t.id === id) ? { ...t, assignee: prev.assignee } : t))
            toast.error("Failed to update assignee.")
        }
    }


    // ─── Click-outside to commit new task ────────────────────────────────────────

    useEffect(() => {
        if (!isAdding) return

        function handleClickOutside(e: MouseEvent) {
            if (newTaskRowRef.current?.contains(e.target as Node)) return
            addTask()
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isAdding, newTaskTitle, temporaryChecked, temporaryAssignee])

    // ─── Derived ─────────────────────────────────────────────────────────────────

    const incompleteTasks = tasks.filter((t) => !t.isCompleted)
    const completedTasks = tasks.filter((t) => t.isCompleted)

    return {
        // state
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
        // derived
        incompleteTasks,
        completedTasks,
        // actions
        toggleTask,
        addTask,
        deleteTask,
        updateTaskTitle,
        updateAssignee,
    }
}