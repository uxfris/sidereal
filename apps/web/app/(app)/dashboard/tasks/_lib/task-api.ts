import { ActionItem, UserSummary } from "../_types/task"

export const taskApi = {
    async toggle(id: string, isCompleted: boolean): Promise<void> {
        await new Promise((r) => setTimeout(r, 300))
        // POST /api/tasks/:id/toggle
    },

    async add(task: ActionItem): Promise<ActionItem> {
        await new Promise((r) => setTimeout(r, 300))
        // POST /api/tasks
        return task
    },

    async remove(id: string): Promise<void> {
        await new Promise((r) => setTimeout(r, 300))
        //DELETE /api/tasks/:id
    },

    async updateTitle(id: string, title: string): Promise<void> {
        await new Promise((r) => setTimeout(r, 300))
        //PATCH /api/tasks/:id
    },

    async updateAssignee(id: string, assignee?: UserSummary): Promise<void> {
        await new Promise((r) => setTimeout(r, 300))
        //PATH /api/tasks/:id
    },


}