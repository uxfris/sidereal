"use client"

import { MinimalisticMagnifier, Widget } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@workspace/ui/components/input-group"
import { List } from "lucide-react";
import { MeetingHostPopover } from "./filter-popovers/meeting-host-popover";
import { MeetingParticipantPopover } from "./filter-popovers/meeting-participant-popover";
import { MeetingTimePopover } from "./filter-popovers/meeting-time-popover";
import { MeetingDurationPopover } from "./filter-popovers/meeting-duration-popover";
import { MeetingSourcePopover } from "./filter-popovers/meeting-source-popover";



export function MeetingSearchFilter() {
    return (
        <div className="flex items-center gap-3">
            <InputGroup className="bg-input w-60">
                <InputGroupInput placeholder="Search meetings..." />
                <InputGroupAddon className="w-5">
                    <MinimalisticMagnifier />
                </InputGroupAddon>
            </InputGroup>
            <div className="flex-1 flex items-center gap-2">
                <MeetingHostPopover />
                <MeetingParticipantPopover />
                <MeetingTimePopover />
                <MeetingDurationPopover />
                <MeetingSourcePopover />
                <Button variant="outline" size="icon-xs">
                    <div className="w-4 h-4 rounded-sm border border-muted-foreground border-dashed" />
                </Button>
                <div className="flex items-center gap-1.5 p-1 bg-secondary rounded-md">
                    <Button variant="ghost" size="icon" className="h-auto w-auto p-1 bg-white dark:bg-accent">
                        <Widget className="w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-auto w-auto p-1 ">
                        <List className="w-3.5" />
                    </Button>

                </div>
            </div>
        </div>
    )
}