import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useMeetingSelection } from "../_stores/meeting-selection-store";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui/components/tooltip";

export function MeetingSelectionButton() {
    const selectionMode = useMeetingSelection(s => s.selectionMode)
    const setSelectionMode = useMeetingSelection(s => s.setSelectionMode)

    return (
        <TooltipProvider delayDuration={700}>
            <Tooltip>
                <TooltipTrigger asChild >
                    <Button variant={selectionMode ? "default" : "outline"} size="icon-xs" onClick={() => setSelectionMode(!selectionMode)}>
                        <div className={cn("w-4 h-4 rounded-sm border border-dashed", selectionMode ? "border-primary-foreground" : "border-muted-foreground")} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Select meetings
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}