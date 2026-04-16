import { Meeting, UpcomingMeetingGroup } from "@workspace/types";


// ── Mock data ──────────────────────────────────────────
const MOCK_MEETINGS: Meeting[] = [
    {
        id: "1",
        title: "Client Onboarding: Helios",
        summary: "Initial walkthrough of the API documentation and environment setup for...",
        status: "analyzing",
        timestamp: "10:30",
        duration: "28m",
        attendees: [
            { id: "a", initials: "A" },
            { id: "b", initials: "B" },
        ],
        extraAttendees: 3,
    },
    {
        id: "2",
        title: "Q4 Strategy Planning",
        summary: "Focus on Q4 revenue targets, engineering headcount, and the new design system...",
        status: "processed",
        timestamp: "14:00",
        duration: "42m",
        attendees: [
            { id: "a", initials: "A" },
            { id: "b", initials: "B" },
        ],
        extraAttendees: 3,
    },
    {
        id: "3",
        title: "Weekly Design Sync",
        summary: `Reviewing the new "Silent Partner" design system tokens. Team discussed the transition from standard grids to tonal architecture.`,
        status: "processed",
        timestamp: "Oct 22, 2024",
        duration: "45m",
        attendees: [
            { id: "c", initials: "C" },
            { id: "d", initials: "D" },
        ],
        extraAttendees: 3,
    },
    {
        id: "4",
        title: "Brand Refresh Kickoff",
        summary: "Aligning on the new visual direction, moodboards, and stakeholder expectations for...",
        status: "processed",
        timestamp: "Oct 18, 2024",
        duration: "2h 15m",
        attendees: [
            { id: "e", initials: "E" },
        ],
        extraAttendees: 2,
    },
]


const MOCK_MEETING: Meeting = {
    id: "4",
    title: "Brand Refresh Kickoff",
    summary: "Aligning on the new visual direction, moodboards, and stakeholder expectations for...",
    status: "processed",
    timestamp: "Oct 18, 2024",
    duration: "2h 15m",
    attendees: [
        { id: "e", initials: "E" },
    ],
    extraAttendees: 2,
}

// ── Mock data ──────────────────────────────────────────
const MOCK_UPCOMING_MEETINGS: UpcomingMeetingGroup[] = [
    {
        label: "TODAY",
        meetings: [
            {
                id: "1",
                title: "Design Review: V2 Specs",
                timestamp: "2:30 PM",
                duration: "60m",
                platform: "Google Meet",
                action: "join",
                attendees: [
                    { id: "a", initials: "A" },
                    { id: "b", initials: "B" },
                ],
                extraAttendees: 2,
            },
            {
                id: "2",
                title: "Product Sync",
                timestamp: "4:00 PM",
                duration: "30m",
                platform: "Zoom",
                action: "prepare",
                attendees: [{ id: "c", initials: "C" }],
                extraAttendees: 5,
            },
            {
                id: "3",
                title: "Product Sync",
                timestamp: "4:00 PM",
                duration: "30m",
                platform: "Zoom",
                action: "prepare",
                attendees: [{ id: "c", initials: "C" }],
                extraAttendees: 5,
            },
            {
                id: "4",
                title: "Product Sync",
                timestamp: "4:00 PM",
                duration: "30m",
                platform: "Zoom",
                action: "prepare",
                attendees: [{ id: "c", initials: "C" }],
                extraAttendees: 5,
            },
        ],
    },
    {
        label: "TOMORROW",
        meetings: [
            {
                id: "3",
                title: "Weekly Engineering Huddle",
                timestamp: "9:30 AM",
                duration: "45m",
                platform: "Google Meet",
                action: "prepare",
                attendees: [{ id: "d", initials: "D" }],
                extraAttendees: 5,
            },
        ],
    },
]




export const meetingApi = {

    async getMeetings(): Promise<Meeting[]> {
        await new Promise((r) => setTimeout(r, 600))
        return MOCK_MEETINGS
    },

    async getUpcomingMeetings(): Promise<UpcomingMeetingGroup[]> {
        await new Promise((r) => setTimeout(r, 600))
        return MOCK_UPCOMING_MEETINGS
    },

    async getMeeting(): Promise<Meeting> {
        await new Promise((r) => setTimeout(r, 600))
        return MOCK_MEETING
    },
}