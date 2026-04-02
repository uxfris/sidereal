"use client"

import { RecentMeeting } from "../../_types/meetings"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { cn } from "@workspace/ui/lib/utils"
import { AttendeeAvatar } from "@/components/attendee-avatar"


export default function MeetingItem({ meeting }: { meeting: RecentMeeting }) {
    const isAnalyzing = meeting.status === "analyzing";
    return (
        <Card className="h-full p-0">
            <CardContent className="h-full flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <Badge className={cn(isAnalyzing ? "bg-accent-2" : "bg-accent-3", "text-primary rounded-[2px] px-2 pb-3 pt-3.5 font-semibold uppercase")}>{meeting.status}</Badge>
                    <span className="text-xs font-medium text-muted-foreground">{meeting.timestamp} • {meeting.duration}</span>
                </div>
                <div className={cn("flex-1", isAnalyzing ? "space-y-4" : "space-y-2")}>
                    <h3 className="text-base font-semibold line-clamp-1">{meeting.title}</h3>
                    {
                        isAnalyzing ?
                            <div className="flex items-center gap-2">
                                <span className="relative flex">
                                    <span className="animate-ping absolute size-1.5 bg-primary rounded-full opacity-75" />
                                    <span className="relative size-1.5 bg-primary rounded-full" />
                                </span>
                                <span className="uppercase text-xs text-primary font-medium">Generating Summary...</span>
                            </div>
                            :
                            <p className="text-sm text-muted-foreground line-clamp-2">{meeting.summary}</p>}
                </div>
                <AttendeeAvatar attendees={meeting.attendees} extra={meeting.extraAttendees} />
            </CardContent>
        </Card>
    )
}