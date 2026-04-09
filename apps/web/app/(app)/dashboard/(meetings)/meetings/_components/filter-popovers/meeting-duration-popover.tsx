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


export function MeetingDurationPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="xs" className="flex-1 justify-between text-muted-foreground">
                    Any Duration
                    <ChevronDown />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-48 px-1">
                <PopoverHeader>
                    <PopoverTitle className="px-3">
                        Duration
                    </PopoverTitle>
                </PopoverHeader>
                <Separator />
                <RadioGroup defaultValue="any-duration" >
                    <FieldLabel htmlFor="any-duration" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldContent>
                                <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                    Any duration
                                </FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="any-duration" id="any-duration" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="less-15-min" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldContent>
                                <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                    {"<15 mins"}
                                </FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="less-15-min" id="less-15-min" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="15-to-30mins" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldContent>
                                <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                    15 to 30 mins
                                </FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="15-to-30mins" id="15-to-30mins" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="30-to-60mins" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldContent>
                                <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                    30 to 60 mins
                                </FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="30-to-60mins" id="30-to-60mins" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="60-to-90mins" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldContent>
                                <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                    60 to 90 mins
                                </FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="60-to-90mins" id="60-to-90mins" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="more-than-90mins" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldContent>
                                <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                    90+ mins
                                </FieldTitle>
                            </FieldContent>
                            <RadioGroupItem value="more-than-90mins" id="more-than-90mins" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                </RadioGroup>
            </PopoverContent>
        </Popover>
    )
}