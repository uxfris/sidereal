"use client"

import { Button } from "@workspace/ui/components/button"
import { RecentMeeting } from "../../_types/meetings"
import MeetingItem from "./meeting-item"
import { cn } from "@workspace/ui/lib/utils"

// ── Mock data ──────────────────────────────────────────
const meetings: RecentMeeting[] = [
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



export function RecentMeetings() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Recent Meetings</h2>
                <Button variant="ghost" size="xs" className="uppercase text-primary font-semibold">View Archive</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {
                    meetings.map((meeting, index) => {
                        const isFullWidth = index >= 2 //first 2 = half, result full
                        return (
                            <div key={index} className={cn(isFullWidth && "md:col-span-2")}>
                                <MeetingItem key={index} meeting={meeting} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}