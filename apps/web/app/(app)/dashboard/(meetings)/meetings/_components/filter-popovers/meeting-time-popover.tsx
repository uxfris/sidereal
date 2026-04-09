import { CalendarMark } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@workspace/ui/components/field";
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
            <PopoverContent side="bottom" align="start" className="w-48 px-1">
                <PopoverHeader>
                    <PopoverTitle className="px-3">
                        Date Range
                    </PopoverTitle>
                </PopoverHeader>
                <Separator />
                <RadioGroup defaultValue="any-time" >
                    <FieldLabel htmlFor="any-time" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldContent>
                                <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                    Any time
                                </FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="any-time" id="any-time" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="today" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldContent>
                                <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                    Today
                                </FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="today" id="today" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="last-7-days" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldContent>
                                <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                    Last 7 days
                                </FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="last-7-days" id="last-7-days" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="last-14-days" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldContent>
                                <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                    Last 14 days
                                </FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="last-14-days" id="last-14-days" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="last-30-days" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldContent>
                                <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                    Last 30 days
                                </FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="last-30-days" id="last-30-days" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                </RadioGroup>
                <Separator />
                <div className="flex items-center justify-between py-2 hover:bg-secondary px-3 rounded-md">
                    <p className="text-sm font-medium normal-case text-popover-foreground">Custom date range</p>
                    <Button variant="ghost" size="icon-xs">
                        <CalendarMark />
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}