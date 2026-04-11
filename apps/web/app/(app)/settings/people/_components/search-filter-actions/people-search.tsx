"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@workspace/ui/components/input-group";
import { MinimalisticMagnifier } from "@solar-icons/react";

export function PeopleSearch() {
    return (
        <InputGroup className="bg-input">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
                <MinimalisticMagnifier />
            </InputGroupAddon>
        </InputGroup>
    )
}