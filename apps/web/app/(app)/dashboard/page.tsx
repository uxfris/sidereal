import { LiveSyncCard } from "./_components/live-sync/live-sync-card";
import { RecentMeetings } from "./_components/meetings/recent-meetings";
import { UpcomingMeetings } from "./_components/upcoming/upcoming-meetings";

export default function DashboardPage() {
    return (
        <div className="flex overflow-hidden">
            {/* Main Content */}
            <div className="flex-1 lg:no-scrollbar overflow-y-auto space-y-8 py-8 px-4 md:px-10">
                <LiveSyncCard />
                <RecentMeetings />

                {/* Show on mobile + tablet only */}
                <div className="lg:hidden">
                    <UpcomingMeetings />
                </div>
            </div>

            {/* Sidebar - desktop only */}
            <div className="hidden lg:flex w-[350px] shrink-0 py-8 pr-10">
                <UpcomingMeetings />
            </div>
        </div>
    );
}