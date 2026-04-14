import { Button } from "@workspace/ui/components/button";
import { List } from "lucide-react";
import { MinimalisticMagnifier, Widget } from "@solar-icons/react";
import { cn } from "@workspace/ui/lib/utils";
import { useState } from "react";


export function IntegrationViewButton() {

    // const meetingView = useMeetingView(v => v.meetingView)
    // const setMeetingView = useMeetingView(v => v.setMeetingView)

    const [integrationView, setIntegrationView] = useState("grid")

    return (
        <div className="hidden md:flex w-fit items-center gap-1.5 p-1 bg-secondary rounded-md">
            <Button
                variant="ghost"
                size="icon"
                className={cn("h-auto w-auto p-1", integrationView === "grid" && "bg-card")}
                onClick={() => setIntegrationView("grid")}>
                <Widget className="w-3.5" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={cn("h-auto w-auto p-1", integrationView === "list" && "bg-card")}
                onClick={() => setIntegrationView("list")}>
                <List className="w-3.5" />
            </Button>
        </div>)
}