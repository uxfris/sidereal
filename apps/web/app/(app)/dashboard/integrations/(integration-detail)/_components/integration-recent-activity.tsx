import type { IntegrationRecentActivity } from "@workspace/types/integrations";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Separator } from "@workspace/ui/components/separator";

export function IntegrationRecentActivityCard({ activities }: { activities: IntegrationRecentActivity[] }) {

    return (
        <div className="space-y-2">
            <h2 className="text-xs text-muted-foreground uppercase">Recent Activity</h2>
            <Card>
                <CardContent className="space-y-4">
                    {activities.map((activity, index) => (
                        <div key={activity.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    <div className="space-y-0.5">
                                        <p className="text-xs font-medium">
                                            {activity.title}
                                        </p>
                                        {activity.description && <p className="text-xs">
                                            {activity.description}
                                        </p>}
                                        <span className="md:hidden text-xs text-muted-foreground">{activity.timestamp}</span>
                                    </div>
                                </div>
                                <span className="hidden md:block text-xs text-muted-foreground">{activity.timestamp}</span>
                            </div>
                            {index !== activities.length - 1 && <Separator />}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
