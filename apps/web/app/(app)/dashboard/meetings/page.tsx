import MeetingItem from "../_components/meetings/meeting-item";
import { RecentMeeting } from "@workspace/types/meetings";
import { TitleMenuDropdown } from "./_components/meeting-title-menu-dropdown";
import { MeetingSearchFilter } from "./_components/meeting-search-filter";
import { MeetingChannelButtons } from "./_components/meeting-channel-buttons";
import { MeetingView } from "./_components/meeting-view";




export default function Meeting() {
    return (
        <div className="flex flex-col overflow-hidden gap-10 px-10 pt-10">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <h1 className="text-base font-semibold">Meetings</h1>
                    <TitleMenuDropdown />
                </div>
                <div className="space-y-3">
                    <MeetingSearchFilter />
                    <MeetingChannelButtons />
                </div>
            </div>
            <MeetingView />
        </div>
    )
}