"use client"

import { MinimalisticMagnifier } from "@solar-icons/react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@workspace/ui/components/input-group"
import { MeetingHostPopover } from "./filter-popovers/meeting-host-popover";
import { MeetingParticipantPopover } from "./filter-popovers/meeting-participant-popover";
import { MeetingTimePopover } from "./filter-popovers/meeting-time-popover";
import { MeetingDurationPopover } from "./filter-popovers/meeting-duration-popover";
import { MeetingSourcePopover } from "./filter-popovers/meeting-source-popover";
import { MeetingSelectionButton } from "./meeting-selection-button";
import { MeetingViewButton } from "./meeting-action/meeting-view-button";


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
                <MeetingSelectionButton />
                <MeetingViewButton />
            </div>
        </div>
    )
}