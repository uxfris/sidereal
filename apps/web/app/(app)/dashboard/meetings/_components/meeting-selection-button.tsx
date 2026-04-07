import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useState } from "react";
import { useMeetingSelection } from "../../_stores/meeting-selection-store";

export function MeetingSelectionButton() {
    const isSelection = useMeetingSelection(s => s.isSelection)
    const setIsSelection = useMeetingSelection(s => s.setIsSelection)
    return (
        <Button variant={isSelection ? "default" : "outline"} size="icon-xs" onClick={() => setIsSelection(!isSelection)}>
            <div className={cn("w-4 h-4 rounded-sm border border-dashed", isSelection ? "border-primary-foreground" : "border-muted-foreground")} />
        </Button>
    )
}