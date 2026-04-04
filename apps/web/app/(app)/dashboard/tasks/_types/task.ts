
export interface ActionItem {
    id: string
    title: string
    description?: string
    isCompleted: boolean
    assignee: {
        id: string
        name: string
        initials: string
        avatarUrl?: string
    } | null
}