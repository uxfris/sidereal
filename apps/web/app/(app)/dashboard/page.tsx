import { LiveSyncCard } from "./_components/live-sync/live-sync-card";
import { RecentMeetings } from "./_components/meetings/recent-meetings";
import { UpcomingMeetings } from "./_components/upcoming/upcoming-meetings";

export default function DashboardPage() {
    return (
        <>
            <div className="hidden md:flex overflow-hidden">
                <div className="flex-1 no-scrollbar overflow-y-auto space-y-10 py-8 px-6 md:px-10">
                    <LiveSyncCard />
                    <RecentMeetings />
                </div>

                {/* Right Panel */}
                <div className="hidden lg:flex w-[300px] shrink-0 py-8 pr-10">
                    <UpcomingMeetings />
                </div>
            </div>
            <div className="md:hidden overflow-y-auto space-y-8 p-4">
                <LiveSyncCard />
                <RecentMeetings />
                <UpcomingMeetings />
            </div>
        </>
    )
}