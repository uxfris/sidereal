import { Button } from "@workspace/ui/components/button";
import { PeopleRoleDropdownMenu } from "./people-role-dropdown-menu";
import { AltArrowDown } from "@solar-icons/react";

export function PeopleChangeRole() {
    return (
        <PeopleRoleDropdownMenu hasHeader={true} triggerButton={
            <Button size="xs" variant="ghost">
                Change role
                <AltArrowDown />
            </Button>
        } />
    )
}