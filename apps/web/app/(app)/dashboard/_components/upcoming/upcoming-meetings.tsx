"use client"

import { Button } from "@workspace/ui/components/button"
import { UpcomingMeeting, UpcomingMeetingGroup } from "../../_types/meetings"
import { ArrowRight, SettingsMinimalistic } from "@solar-icons/react"
import { Card, CardContent, CardFooter } from "@workspace/ui/components/card"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@workspace/ui/components/avatar"
import { ClockCircle } from "@solar-icons/react/ssr"
import { cn } from "@workspace/ui/lib/utils"

// ── Mock data ──────────────────────────────────────────
const groups: UpcomingMeetingGroup[] = [
    {
        label: "TODAY",
        meetings: [
            {
                id: "1",
                title: "Design Review: V2 Specs",
                time: "2:30 PM",
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
                time: "4:00 PM",
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
                time: "9:30 AM",
                duration: "45m",
                platform: "Google Meet",
                action: "prepare",
                attendees: [{ id: "d", initials: "D" }],
                extraAttendees: 5,
            },
        ],
    },
]

export function MeetingItem({ meeting, isTomorrow }: { meeting: UpcomingMeeting, isTomorrow: boolean }) {
    const isJoin = meeting.action === "join";
    return (
        <Card className={cn(isTomorrow && "bg-gray-100 dark:bg-card border border-dashed border-gray-200 dark:border-gray-800")}>
            <CardContent className="space-y-6">
                <div className="space-y-1">
                    <div className="flex justify-between">
                        <h4 className="font-semibold text-base">{meeting.title}</h4>
                        <Button size="xs" variant={isJoin ? "default" : "outline"} className={cn("uppercase text-[10px]", !isJoin && isTomorrow && "bg-white dark:bg-card")}>{meeting.action}</Button>
                    </div>
                    <div className="flex gap-1.5 items-center font-medium text-xs">
                        <ClockCircle />
                        <span>{meeting.time} • {meeting.duration}</span>
                    </div>
                </div>
                <div className={cn("flex items-center justify-between pt-4 border-t border-gray-50: dark:border-gray-800", isTomorrow && "border-gray-200")}>
                    <AvatarGroup>
                        {meeting.attendees.map((attendee) => (
                            <Avatar key={attendee.id} size="sm">
                                <AvatarImage src={attendee.avatarUrl} />
                                <AvatarFallback className="text-xs font-medium">{attendee.initials}</AvatarFallback>
                            </Avatar>
                        ))}
                        <AvatarGroupCount className="text-xs font-medium">+{meeting.extraAttendees}</AvatarGroupCount>
                    </AvatarGroup>
                    <span className="text-muted-foreground text-xs font-medium">{meeting.platform}</span>
                </div>

            </CardContent>
        </Card>
    )
}

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
                        <h3 className="uppercase text-[11px] font-semibold text-muted-foreground">{group.label}</h3>
                        {group.meetings.map((meeting) => (
                            <MeetingItem key={meeting.id} meeting={meeting} isTomorrow={group.label.toLowerCase() === "tomorrow"} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}