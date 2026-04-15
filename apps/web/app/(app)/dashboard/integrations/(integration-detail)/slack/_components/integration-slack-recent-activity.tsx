import { Card, CardContent } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";

const MOCK_SLACK_RECENT_ACTIVITY = [
    {
        id: "1",
        title: "Summary posted to #product — Sprint Retrospective",
        description: "3 action items with @mentions",
        timestamp: "Just now",
    },
    {
        id: "2",
        title: "Summary posted to #engineering — Weekly Sync",
        description: "2 action items with @mentions",
        timestamp: "2 hr ago",
    },
    {
        id: "3",
        title: "Post failed — All Hands",
        description: "Bot removed from #product",
        timestamp: "Yesterday",
    },
    {
        id: "4",
        title: "Summary posted to #product — Tech Review",
        description: "DM also sent to organizer",
        timestamp: "2 days ago",
    },
]

export function IntegrationSlackRecentActivity() {

    return (
        <div className="space-y-2">
            <h2 className="text-xs text-muted-foreground uppercase">Recent Activity</h2>
            <Card>
                <CardContent className="space-y-4">
                    {MOCK_SLACK_RECENT_ACTIVITY.map((activity, index) => (
                        <div key={activity.id} className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium">
                                            {activity.title}
                                        </p>
                                        <p className="text-xs">
                                            {activity.description}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                            </div>
                            {index !== MOCK_SLACK_RECENT_ACTIVITY.length - 1 && <Separator />}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}