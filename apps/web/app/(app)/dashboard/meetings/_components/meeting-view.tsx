"use client"

import { Meeting } from "@workspace/types/meetings"
import MeetingItem from "../../_components/meetings/meeting-item"
import { useMeetingSelection } from "../_stores/meeting-selection-store"




export function MeetingView({ meetings }: { meetings: Meeting[] }) {
    const selectionMode = useMeetingSelection(s => s.selectionMode)
    return (
        <div className="grid grid-cols-3 gap-5 items-stretch">
            {meetings.map((meeting) => <MeetingItem key={meeting.id} meeting={meeting} selectionMode={selectionMode} />)}
        </div>
    )
}