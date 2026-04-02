"use client"

import { Button } from "@workspace/ui/components/button"
import { UpcomingMeetingGroup } from "../../_types/meetings"
import { ArrowRight, SettingsMinimalistic } from "@solar-icons/react"
import { MeetingItem } from "./upcoming-meeting-item"

// ── Mock data ──────────────────────────────────────────
const groups: UpcomingMeetingGroup[] = [
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



export function UpcomingMeetings() {
    const total = groups.reduce((acc, g) => acc + g.meetings.length, 0)

    return (
        <div className="flex flex-col gap-8">
            <div>
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{total} Upcoming Meetings</h2>
                    <Button variant="ghost"><SettingsMinimalistic /></Button>
                </div>
                <Button variant="ghost" size="xs" className="text-primary hover:bg-transparent p-0">
                    Schedule new meeting
                    <ArrowRight />
                </Button>
            </div>
            {/* Groups */}
            <div className="flex-1 overflow-y-auto space-y-8">
                {groups.map((group) => (
                    <div key={group.label} className="space-y-4">
                        <h3 className="uppercase text-[11px] font-semibold text-muted-foreground tracking-widest">{group.label}</h3>
                        {group.meetings.map((meeting) => (
                            <MeetingItem key={meeting.id} meeting={meeting} isTomorrow={group.label.toLowerCase() === "tomorrow"} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}