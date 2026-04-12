"use client"

import { MinimalisticMagnifier, Pen } from "@solar-icons/react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@workspace/ui/components/input-group"
import { Button } from "@workspace/ui/components/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@workspace/ui/components/tooltip";


export function MeetingDocumentTranscript() {
    return (
        <section className="space-y-4">
            <div className="flex justify-between">
                <h2 className="text-lg font-semibold">
                    Smart Transcript
                </h2>
                {/* Search and Edit */}
                <div className="flex items-center gap-3">
                    <InputGroup className="bg-input w-64">
                        <InputGroupInput placeholder="Find in transcript..." />
                        <InputGroupAddon className="w-5">
                            <MinimalisticMagnifier />
                        </InputGroupAddon>
                    </InputGroup>
                    <TooltipProvider delayDuration={700}>
                        <Tooltip>
                            <TooltipTrigger asChild >
                                <Button variant="outline" size="icon-xs">
                                    <Pen className="text-muted-foreground" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Edit transcript
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            {/* Transcript Content */}
            <div className="flex items-center justify-center text-center h-svh">
                Transcript content
            </div>

        </section>
    )
}