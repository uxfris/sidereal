import { CalendarMark } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@workspace/ui/components/popover"
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";
import { Separator } from "@workspace/ui/components/separator";
import { ChevronDown, } from "lucide-react";


export function MeetingTimePopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="xs" className="flex-1 justify-between text-muted-foreground">
                    Any time
                    <ChevronDown />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-64 px-1">
                <PopoverHeader>
                    <PopoverTitle className="px-3">
                        Date Range
                    </PopoverTitle>
                </PopoverHeader>
                <Separator />
                <RadioGroup>
                    <div className="flex items-center justify-between hover:bg-secondary px-3 py-2 rounded-md">
                        <Label htmlFor="any-time" className="normal-case text-sm font-medium">Any time</Label>
                        <RadioGroupItem value="any-time" id="any-time" />
                    </div>
                    <div className="flex items-center justify-between hover:bg-secondary px-3 py-2 rounded-md">
                        <Label htmlFor="today" className="normal-case text-sm font-medium">Today</Label>
                        <RadioGroupItem value="today" id="today" />
                    </div>
                    <div className="flex items-center justify-between hover:bg-secondary px-3 py-2 rounded-md">
                        <Label htmlFor="last-7-days" className="normal-case text-sm font-medium">Last 7 days</Label>
                        <RadioGroupItem value="last-7-days" id="last-7-days" />
                    </div>
                    <div className="flex items-center justify-between hover:bg-secondary px-3 py-2 rounded-md">
                        <Label htmlFor="last-14-days" className="normal-case text-sm font-medium">Last 14 days</Label>
                        <RadioGroupItem value="last-14-days" id="last-14-days" />
                    </div>
                    <div className="flex items-center justify-between hover:bg-secondary px-3 py-2 rounded-md">
                        <Label htmlFor="last-30-days" className="normal-case text-sm font-medium">Last 30 days</Label>
                        <RadioGroupItem value="last-30-days" id="last-30-days" />
                    </div>
                </RadioGroup>
                <Separator />
                <div className="flex items-center justify-between py-3 hover:bg-secondary px-3 rounded-md">
                    <Label htmlFor="custom-date-range">Custom date range</Label>
                    <Button variant="ghost" size="icon-xs">
                        <CalendarMark />
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}