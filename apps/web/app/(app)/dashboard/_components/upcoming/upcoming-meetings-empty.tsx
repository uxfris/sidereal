import { CalendarMinimalistic } from "@solar-icons/react";
import { Card } from "@workspace/ui/components/card";
import { ScheduleNewMeetingButton } from "./schedule-new-meeting-button";

export function UpcomingMeetingsEmpty() {
    return (
        <Card className="h-[354px] flex items-center justify-center gap-8 text-center px-6">
            <div className="w-20 h-20 flex items-center justify-center rounded-md border border-border">
                <CalendarMinimalistic size={32} className="text-primary" />
            </div>
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">All Clear for Now</h3>
                <p className="text-sm text-muted-foreground">Your schedule is wide open. A perfect opportunity for some deep focus.</p>
            </div>
            <ScheduleNewMeetingButton />

        </Card>
    )
}