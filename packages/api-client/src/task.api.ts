import { ActionItem, TasksGroup, UserSummary } from "@workspace/types/task"
import { client } from "./client";

const MOCK_TASK_GROUPS: TasksGroup[] = [
    {
        id: "group-1",
        title: "Website Redesign",
        timestamp: "2025-03-20T14:30:00Z",
        tasks: [
            {
                id: "task-1",
                title: "Create wireframes",
                isCompleted: true,
                assignee: {
                    id: "user-1",
                    name: "Alice Johnson",
                    initials: "AJ",
                    avatarUrl: "https://i.pravatar.cc/150?img=1"
                }
            },
            {
                id: "task-2",
                title: "Design landing page",
                isCompleted: false,
                assignee: {
                    id: "user-2",
                    name: "Bob Smith",
                    initials: "BS",
                    avatarUrl: "https://i.pravatar.cc/150?img=2"
                }
            },
            {
                id: "task-3",
                title: "Prepare design assets",
                isCompleted: false,
                assignee: null
            }
        ]
    },
    {
        id: "group-2",
        title: "Mobile App Launch",
        timestamp: "2025-03-22T09:00:00Z",
        tasks: [
            {
                id: "task-4",
                title: "Fix login bug",
                isCompleted: true,
                assignee: {
                    id: "user-3",
                    name: "Charlie Lee",
                    initials: "CL",
                    avatarUrl: "https://i.pravatar.cc/150?img=3"
                }
            },
            {
                id: "task-5",
                title: "Implement push notifications",
                isCompleted: false,
                assignee: {
                    id: "user-1",
                    name: "Alice Johnson",
                    initials: "AJ",
                    avatarUrl: "https://i.pravatar.cc/150?img=1"
                }
            }
        ]
    },
    {
        id: "group-3",
        title: "Marketing Campaign",
        timestamp: "2025-03-25T16:45:00Z",
        tasks: [
            {
                id: "task-6",
                title: "Write email copy",
                isCompleted: false,
                assignee: null
            },
            {
                id: "task-7",
                title: "Design social media banners",
                isCompleted: true,
                assignee: {
                    id: "user-2",
                    name: "Bob Smith",
                    initials: "BS",
                    avatarUrl: "https://i.pravatar.cc/150?img=2"
                }
            },
            {
                id: "task-8",
                title: "Schedule posts",
                isCompleted: false,
                assignee: {
                    id: "user-3",
                    name: "Charlie Lee",
                    initials: "CL",
                    avatarUrl: "https://i.pravatar.cc/150?img=3"
                }
            }
        ]
    }
];

//Mock data
const MOCK_ASSIGNEES: UserSummary[] = [
    {
        id: "1",
        name: "Fris El",
        initials: "FE",
        avatarUrl: "https://assets.lummi.ai/assets/Qmeh9r8a3AE8dQyCTSLiqVKLgu6HKEvJWaEwxMUMyDqHn5?auto=format&w=150"
    },
    {
        id: "user-1",
        name: "Alice Johnson",
        initials: "AJ",
        avatarUrl: "https://i.pravatar.cc/150?img=1"
    }
]



export const taskApi = {
    // getGroups: () => client.get<TasksGroup[]>('/tasks/groups'),
    async fetchTasksGroup(): Promise<TasksGroup[]> {
        await new Promise((r) => setTimeout(r, 600))
        return MOCK_TASK_GROUPS
    },

    async fetchAssignees(): Promise<UserSummary[]> {
        await new Promise((r) => setTimeout(r, 600))
        return MOCK_ASSIGNEES
    },

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