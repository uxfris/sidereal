import { Button } from "@workspace/ui/components/button"
import MeetingItem from "./meeting-item"
import { cn } from "@workspace/ui/lib/utils"
import { EmptyState } from "@/components/empty-state"
import { meetingApi } from "@workspace/api-client"


export async function RecentMeetings() {

    const meetings = await meetingApi.getMeetings()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-[-0.4px]">Recent Meetings</h2>
                <Button variant="ghost" size="xs" className="uppercase text-primary font-semibold">View Archive</Button>
            </div>
            {meetings.length === 0 ?
                <EmptyState title="No recent activity yet" description="Your meeting summaries and section items will appear here once your first session is processed." />
                :
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    {
                        meetings.map((meeting, index) => {
                            const isFullWidth = index >= 2 //first 2 = half, rest full
                            return (
                                <div key={meeting.id} className={cn(isFullWidth && "md:col-span-2")}>
                                    <MeetingItem meeting={meeting} />
                                </div>
                            )
                        })
                    }
                </div>
            }

        </div>
    )
}