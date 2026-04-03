import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";

export function ScheduleNewMeetingButton() {
    return (
        <Button variant="ghost" size="xs" className="text-primary">
            Schedule new meeting
            <ArrowRight />
        </Button>
    )
}