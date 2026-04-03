// Remove this later
// "use client"

import { useTheme } from "next-themes";
import { LiveSyncCard } from "./_components/live-sync/live-sync-card";
import { RecentMeetings } from "./_components/meetings/recent-meetings";
import { UpcomingMeetings } from "./_components/upcoming/upcoming-meetings";
import { Button } from "@workspace/ui/components/button";

export default function DashboardPage() {
    //Remove this later
    // const { setTheme } = useTheme()
    return (
        <div className="flex overflow-hidden">
            {/* For test only */}
            {/* <Button onClick={() => setTheme("light")}>Set Theme</Button> */}
            {/* ── Main scrollable content ── */}
            <div className="flex-1 no-scrollbar overflow-y-auto space-y-10 py-8 px-6 md:px-10">
                <LiveSyncCard />
                <RecentMeetings />
            </div>

            {/* Right Panel */}
            <div className="hidden lg:flex w-[300px] shrink-0 py-8 pr-10">
                <UpcomingMeetings />
            </div>
        </div>
    )
}