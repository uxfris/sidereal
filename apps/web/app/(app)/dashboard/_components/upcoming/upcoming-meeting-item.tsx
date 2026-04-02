"use client"

import { Button } from "@workspace/ui/components/button"
import { UpcomingMeeting } from "../../_types/meetings"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@workspace/ui/components/avatar"
import { ClockCircle } from "@solar-icons/react/ssr"
import { cn } from "@workspace/ui/lib/utils"


export function UpcomingMeetingItem({ meeting, isTomorrow }: { meeting: UpcomingMeeting, isTomorrow: boolean }) {
    const isJoin = meeting.action === "join";
    return (
        <Card className={cn(isTomorrow && "bg-gray-100 dark:bg-card border border-dashed border-gray-200 dark:border-gray-800")}>
            <CardContent className="space-y-6">
                <div className="space-y-1">
                    <div className="flex justify-between gap-1">
                        <h4 className="flex-1 min-w-0 font-semibold text-base line-clamp-2 overflow-hidden">{meeting.title}</h4>
                        <Button size="xs" variant={isJoin ? "default" : "outline"} className={cn("uppercase text-[10px]", !isJoin && isTomorrow && "border-gray-200 dark:border-gray-800")}>{meeting.action}</Button>
                    </div>
                    <div className="flex gap-1.5 items-center font-medium text-xs">
                        <ClockCircle />
                        <span>{meeting.timestamp} • {meeting.duration}</span>
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