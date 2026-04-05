export interface UserSummary {
    id: string
    name: string
    initials: string
    avatarUrl?: string
}

export interface ActionItem {
    id: string
    title: string
    isCompleted: boolean
    assignee: UserSummary | null
}

export interface TaskGroup {
    id: string
    title: string
    timestamp: string // ISO 8601
    tasks: ActionItem[]
}