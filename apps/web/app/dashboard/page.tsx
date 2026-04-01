import { LiveSyncCard } from "./_components/live-sync/live-sync-card";
import { RecentMeetings } from "./_components/meetings/recent-meetings";
import { UpcomingMeetings } from "./_components/upcoming/upcoming-meetings";

export default function DashboardPage() {
    return (
        <div className="flex flex-1 gap-10 pt-8 px-10 overflow-hidden">
            {/* ── Main scrollable content ── */}
            <div className="flex-1 overflow-y-auto space-y-10">
                <LiveSyncCard />
                <RecentMeetings />
            </div>

            {/* Right Panel */}
            <div className="hidden lg:flex w-[288px] shrink-0 overflow-y-auto">
                <UpcomingMeetings />
            </div>
        </div>
    )
}