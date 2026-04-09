import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@workspace/ui/components/popover"
import { Separator } from "@workspace/ui/components/separator";
import { ChevronDown, } from "lucide-react";

// Mock data
const MOCK_SOURCES = [
    {
        id: "1",
        label: "Meeting Note-taker",
        isChecked: false,
    },
    {
        id: "2",
        label: "Uploads",
        isChecked: true,
    }
]


export function MeetingSourcePopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="xs" className="flex-1 justify-between text-muted-foreground">
                    Any source
                    <ChevronDown />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-72 px-1">
                <PopoverHeader>
                    <PopoverTitle className="px-3">
                        Captured from
                    </PopoverTitle>
                </PopoverHeader>
                <Separator />
                <div>
                    {
                        MOCK_SOURCES.map((source) => (
                            <div key={source.id} className="flex items-center p-3 hover:bg-secondary rounded-md">
                                <Label className="flex-1 normal-case text-popover-foreground font-medium text-sm">{source.label}</Label>
                                <Checkbox checked={source.isChecked} onClick={(e) => e.stopPropagation()} />
                            </div>
                        ))
                    }
                </div>
            </PopoverContent>
        </Popover>
    )
}