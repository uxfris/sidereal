import { Button } from "@workspace/ui/components/button";
import { List } from "lucide-react";
import { MinimalisticMagnifier, Widget } from "@solar-icons/react";
import { useMeetingView } from "../../_stores/meeting-view-store";
import { cn } from "@workspace/ui/lib/utils";


export function MeetingViewButton() {

    const meetingView = useMeetingView(v => v.meetingView)
    const setMeetingView = useMeetingView(v => v.setMeetingView)

    return (
        <div className="flex items-center gap-1.5 p-1 bg-secondary rounded-md">
            <Button
                variant="ghost"
                size="icon"
                className={cn("h-auto w-auto p-1", meetingView === "grid" && "bg-card")}
                onClick={() => setMeetingView("grid")}>
                <Widget className="w-3.5" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={cn("h-auto w-auto p-1", meetingView === "list" && "bg-card")}
                onClick={() => setMeetingView("list")}>
                <List className="w-3.5" />
            </Button>
        </div>)
}