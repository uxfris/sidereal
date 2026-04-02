
export type MeetingStatus = "analyzing" | "processed"
export type MeetingPlatform = "Google Meet" | "Zoom" | "Teams"

export interface RecentMeeting {
    id: string
    title: string
    summary: string
    status: MeetingStatus
    timestamp: string   // display string, e.g. "10:30" or "Oct 22, 2024"
    duration: string    // e.g. "28m"
    attendees: { id: string; avatarUrl?: string; initials: string }[],
    extraAttendees?: number,
}




export interface UpcomingMeeting {
    id: string
    title: string
    timestamp: string   // display string, e.g. "10:30" or "Oct 22, 2024"
    duration: string    // e.g. "28m"
    platform: MeetingPlatform
    action: 'join' | 'prepare'
    attendees: { id: string; avatarUrl?: string; initials: string }[]
    extraAttendees?: number
}

export interface UpcomingMeetingGroup {
    label: string
    meetings: UpcomingMeeting[]
}