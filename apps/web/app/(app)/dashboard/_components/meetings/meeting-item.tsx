"use client"

import { RecentMeeting } from "../../_types/meetings"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@workspace/ui/components/avatar"
import { cn } from "@workspace/ui/lib/utils"


export default function MeetingItem({ meeting }: { meeting: RecentMeeting }) {
    return (
        <Card className="space-y-6">
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <Badge className={cn("bg-accent-2", "text-primary rounded-[2px] px-2 py-3 font-semibold uppercase")}>{meeting.status}</Badge>
                    <span className="text-xs font-medium text-muted-foreground">{meeting.timestamp} • {meeting.duration}</span>
                </div>
                <div className="space-y-2">
                    <h3 className="text-base font-semibold line-clamp-1">{meeting.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{meeting.summary}</p>
                </div>
                <AvatarGroup>
                    {meeting.attendees.map((attendee) => (
                        <Avatar key={attendee.id} size="sm">
                            <AvatarImage src={attendee.avatarUrl} />
                            <AvatarFallback className="text-xs font-medium">{attendee.initials}</AvatarFallback>
                        </Avatar>
                    ))}
                    {meeting.extraAttendees && <AvatarGroupCount className="text-xs font-medium">+{meeting.extraAttendees}</AvatarGroupCount>}
                </AvatarGroup>
            </CardContent>
        </Card>
    )
}