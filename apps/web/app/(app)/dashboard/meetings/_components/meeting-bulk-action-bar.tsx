"use client"

import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";
import { useMeetingSelection } from "../_stores/meeting-selection-store";
import { useMeetings } from "../_hooks/use-meeting-context";

export function MeetingBulkActionBar() {

    const selectionMode = useMeetingSelection(s => s.selectionMode)
    const setSelectionMode = useMeetingSelection(s => s.setSelectionMode)
    const selectedIds = useMeetingSelection(s => s.selectedIds)
    const selectAll = useMeetingSelection(s => s.selectAll)
    const clearSelection = useMeetingSelection(s => s.clearSelection)

    const meetings = useMeetings();

    const allIds = meetings.map(m => m.id) // you must pass this in or lift it up
    const isAllSelected = selectedIds.length === allIds.length


    if (selectionMode)
        return (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-popover border border-border shadow-lg rounded-sm flex items-center gap-2 p-2">
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="select-meetings"
                        className="border-foreground"
                        checked={isAllSelected}
                        onCheckedChange={(checked) => checked ? selectAll(allIds) : clearSelection()}

                    />
                    <Label htmlFor="select-meetings" className="text-xs text-foreground normal-case hover:underline cursor-pointer">Select all ({selectedIds.length})</Label>
                </div>
                <div className="w-px h-[22px] bg-border" />
                <Button size="xs" variant="ghost" onClick={() => {
                    setSelectionMode(false)
                    clearSelection()
                }}>Cancel</Button>
            </div>
        )
}