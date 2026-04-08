"use client"

import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";
import { useMeetingSelection } from "../_stores/meeting-selection-store";
import { Meeting } from "@workspace/types/meetings";
import { Hashtag, TrashBin2, UsersGroupRounded } from "@solar-icons/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip";
import { SmartKbd } from "@workspace/ui/components/smart-kbd";
import { useShortcutRegister } from "@workspace/ui/components/shortcut-provider";
import { useEffect } from "react";
import { MoveToChannelDialog } from "./meeting-action/move-to-channel-dialog";
import { MoveToWorkspaceDialog } from "./meeting-action/move-to-workspace-dialog";

export function MeetingBulkActionBar({ meetings }: { meetings: Meeting[] }) {

    const selectionMode = useMeetingSelection(s => s.selectionMode)
    const setSelectionMode = useMeetingSelection(s => s.setSelectionMode)
    const selectedIds = useMeetingSelection(s => s.selectedIds)
    const selectAll = useMeetingSelection(s => s.selectAll)
    const clearSelection = useMeetingSelection(s => s.clearSelection)


    const allIds = meetings.map(m => m.id) // you must pass this in or lift it up
    const isAllSelected = selectedIds.length === allIds.length


    const { register } = useShortcutRegister()

    useEffect(() => {
        register("selectall", () => selectionMode ? isAllSelected ? clearSelection() : selectAll(allIds) : {})
    })


    if (selectionMode)
        return (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-popover border border-border shadow-lg rounded-sm flex items-center gap-2 p-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="select-meetings"
                                className="border-foreground"
                                checked={isAllSelected}
                                onCheckedChange={(checked) => checked ? selectAll(allIds) : clearSelection()}

                            />
                            <Label
                                htmlFor="select-meetings"
                                className="text-xs text-foreground normal-case hover:underline cursor-pointer whitespace-nowrap">
                                {selectedIds.length > 0 ? `${selectedIds.length} Selected` : `Select all (${allIds.length})`}
                            </Label>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <SmartKbd action={"selectall"} />
                    </TooltipContent>
                </Tooltip>
                {
                    selectedIds.length > 0 &&
                    <>
                        <div className="w-px h-[22px] bg-border" />
                        <MoveToChannelDialog />
                        <MoveToWorkspaceDialog />
                        <div className="w-px h-[22px] bg-border" />
                        <Button size="xs" variant="destructive" className="bg-transparent">
                            <TrashBin2 />
                            Delete
                        </Button>
                        <div className="w-px h-[22px] bg-border" />
                        <Button size="xs" variant="ghost" onClick={() => {
                            clearSelection()
                        }}>Clear</Button>
                    </>
                }
                <div className="w-px h-[22px] bg-border" />
                <Button size="xs" variant="ghost" onClick={() => {
                    setSelectionMode(false)
                    clearSelection()
                }}>Cancel</Button>
            </div>
        )
}