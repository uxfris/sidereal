import { Meeting } from "@workspace/types/meetings"
import { MeetingsProvider } from "../../_hooks/use-meeting-context"
import { MeetingSearchFilter } from "../../_components/meeting-search-filter"
import { MeetingChannelButtons } from "../../_components/meeting-channel-buttons"
import { MeetingView } from "../../_components/meeting-view"
import { MeetingBulkActionBar } from "../../_components/meeting-bulk-action-bar"
import { MeetingChannelEmpty } from "../_components/meeting-channel-empty"
import { ChannelTitleMenuDropdown } from "../_components/meeting-channel-title-menu-dropdown"


// ── Mock data ──────────────────────────────────────────
const meetings: Meeting[] = [
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



export default function MeetingChannel({ params }: { params: { id: string } }) {
    const { id } = params
    return (
        <div className="relative h-full flex flex-col overflow-hidden gap-6">
            <div className="flex items-center gap-3 px-10 pt-10">
                <h1 className="text-base font-semibold">Design Sprint</h1>
                <ChannelTitleMenuDropdown />
            </div>
            {meetings.length === 0
                ?
                <MeetingChannelEmpty />
                :
                <>
                    <div className="overflow-y-auto px-10 pb-10 space-y-10">
                        <div className="space-y-3">
                            <MeetingsProvider meetings={meetings}>
                                <MeetingSearchFilter />
                            </MeetingsProvider>
                            <MeetingChannelButtons />
                        </div>
                        <MeetingView meetings={meetings} />
                    </div>
                    <MeetingBulkActionBar meetings={meetings} />
                </>}
        </div>
    )
}