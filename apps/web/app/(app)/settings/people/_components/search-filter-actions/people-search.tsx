"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@workspace/ui/components/input-group";
import { MinimalisticMagnifier } from "@solar-icons/react";
import { X } from "lucide-react";
import { Button } from "@workspace/ui/components/button";


export function PeopleSearch(
    { value, onChange }: { value: string, onChange: (value: string) => void }
) {


    return (
        <InputGroup className="bg-input">
            <InputGroupInput
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search..." />
            <InputGroupAddon>
                <MinimalisticMagnifier />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end" className={value ? "opacity-100" : "opacity-0"}>
                <Button
                    onClick={() => onChange("")}
                    size="icon" variant="ghost" className="h-fit w-fit py-1 px-1">
                    <X />
                </Button>
            </InputGroupAddon>
        </InputGroup>
    )
}