"use client"

import { MinimalisticMagnifier, Widget } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@workspace/ui/components/input-group"
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@workspace/ui/components/popover"
import { ChevronDown, List } from "lucide-react";



export function MeetingSearchFilter() {
    return (
        <div className="flex items-center gap-3">
            <InputGroup className="bg-input rounded-md">
                <InputGroupInput placeholder="Search meetings..." />
                <InputGroupAddon className="w-5">
                    <MinimalisticMagnifier />
                </InputGroupAddon>
            </InputGroup>
            <div className="flex items-center gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="xs" className="text-muted-foreground">
                            Any host
                            <ChevronDown />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader>
                            <PopoverTitle>
                                Hosted by
                            </PopoverTitle>
                        </PopoverHeader>
                    </PopoverContent>
                </Popover>
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