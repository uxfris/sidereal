
export type MeetingStatus = "analyzing" | "processed"
export type MeetingPlatform = "Google Meet" | "Zoom" | "Teams"

export interface Attendee { id: string; avatarUrl?: string; initials: string }

export interface RecentMeeting {
    id: string
    title: string
    summary: string
    status: MeetingStatus
    timestamp: string   // display string, e.g. "10:30" or "Oct 22, 2024"
    duration: string    // e.g. "28m"
    attendees: Attendee[],
    extraAttendees?: number,
}




export interface UpcomingMeeting {
    id: string
    title: string
    timestamp: string   // display string, e.g. "10:30" or "Oct 22, 2024"
    duration: string    // e.g. "28m"
    platform: MeetingPlatform
    action: 'join' | 'prepare'
    attendees: Attendee[]
    extraAttendees?: number
}

export interface UpcomingMeetingGroup {
    label: string
    meetings: UpcomingMeeting[]
}