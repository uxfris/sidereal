import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useMeetingSelection } from "../_stores/meeting-selection-store";
import { useMeetings } from "../_hooks/use-meeting-context";

export function MeetingSelectionButton() {
    const selectionMode = useMeetingSelection(s => s.selectionMode)
    const setSelectionMode = useMeetingSelection(s => s.setSelectionMode)
    const selectedIds = useMeetingSelection(s => s.selectedIds)
    const selectAll = useMeetingSelection(s => s.selectAll)
    const clearSelection = useMeetingSelection(s => s.clearSelection)

    const meetings = useMeetings();

    const allIds = meetings.map(m => m.id) // you must pass this in or lift it up
    const isAllSelected = selectedIds.length === allIds.length


    return (
        <Button variant={selectionMode ? "default" : "outline"} size="icon-xs" onClick={() => setSelectionMode(!selectionMode)}>
            <div className={cn("w-4 h-4 rounded-sm border border-dashed", selectionMode ? "border-primary-foreground" : "border-muted-foreground")} />
        </Button>
    )
}