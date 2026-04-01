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
        <div className="flex flex-1 gap-10 pt-8 px-10 overflow-hidden">
            {/* For test only */}
            {/* <Button onClick={() => setTheme("light")}>Set Theme</Button> */}
            {/* ── Main scrollable content ── */}
            <div className="hidden flex-1 overflow-y-auto space-y-10">
                <LiveSyncCard />
                <RecentMeetings />
            </div>

            {/* Right Panel */}
            <div className="w-[288px] shrink-0 overflow-y-auto">
                <UpcomingMeetings />
            </div>
        </div>
    )
}