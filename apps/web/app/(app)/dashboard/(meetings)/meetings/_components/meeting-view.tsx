"use client"

import { Meeting } from "@workspace/types/meetings"
import MeetingItem from "../../../_components/meetings/meeting-item"
import { useMeetingSelection } from "../_stores/meeting-selection-store"
import { useState } from "react"
import { cn } from "@workspace/ui/lib/utils"
import { useMeetingView } from "../_stores/meeting-view-store"




export function MeetingView({ meetings }: { meetings: Meeting[] }) {
    const selectionMode = useMeetingSelection(s => s.selectionMode)

    const meetingView = useMeetingView(v => v.meetingView)

    return (
        <div className={cn(meetingView === "list" ? "flex flex-col gap-5" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch")}>
            {meetings.map((meeting) => <MeetingItem key={meeting.id} meeting={meeting} selectionMode={selectionMode} />)}
        </div>
    )
}