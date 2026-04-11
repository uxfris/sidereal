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


export function PeopleRolePopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="xs" className="flex-1 justify-between text-muted-foreground">
                    All roles
                    <ChevronDown />
                </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-48 px-1">
                <PopoverHeader>
                    <PopoverTitle className="px-3">
                        Roles
                    </PopoverTitle>
                </PopoverHeader>
                <Separator />
                <RadioGroup defaultValue="all-roles" >
                    <FieldLabel htmlFor="all-roles" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                All roles
                            </FieldTitle>
                            <RadioGroupItem value="all-roles" id="all-roles" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="owner" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                Owner
                            </FieldTitle>
                            <RadioGroupItem value="owner" id="owner" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="member" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                Member
                            </FieldTitle>
                            <RadioGroupItem value="member" id="member" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="admin" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                Admin
                            </FieldTitle>
                            <RadioGroupItem value="admin" id="admin" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="guest" className="border-none">
                        <Field orientation="horizontal" className="group hover:bg-secondary px-3 py-2 rounded-md">
                            <FieldTitle className="normal-case text-sm text-popover-foreground font-medium">
                                Guest
                            </FieldTitle>
                            <RadioGroupItem value="guest" id="guest" className="group-hover:data-[state=unchecked]:border-foreground" />
                        </Field>
                    </FieldLabel>
                </RadioGroup>
            </PopoverContent>
        </Popover>
    )
}