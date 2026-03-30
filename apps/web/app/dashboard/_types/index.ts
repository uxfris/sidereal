import { Icon } from "@solar-icons/react/lib/types"

export type NavItem = {
    label: string,
    url: string,
    icon: Icon,
    active?: boolean,
    badge?: React.ReactNode,
    type?: 'link' | 'dialog' | 'collapsible',
    isSearch?: boolean,
    dialogContent?: React.ReactNode,
    collapsibleContent?: React.ReactNode
}


export type MeetingStatus = "analyzing" | "processing" | "generating"

export interface Meeting {
    id: string
    title: string
    description: string
    status: MeetingStatus
    startTime: string   //"10:30 AM"
    duration: number    // minutes
    date: string    // "Oct 22, 2026" – absent if today
    attendees: { id: string; avatarUrl?: string; initials: string }[]
}

export interface UpcomingMeeting {
    id: string
    title: string
    time: string   //"2:30 PM"
    duration: string    // "Oct 22, 2026" – absent if today
    platform: 'Google Meet' | 'Teams' | 'Zoom'
    action: 'join' | 'prepare'
    day: 'today' | 'tomorrow'
    attendees: { id: string; avatarUrl?: string; initials: string }[]
}