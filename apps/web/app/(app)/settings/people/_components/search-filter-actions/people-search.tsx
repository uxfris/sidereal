"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@workspace/ui/components/input-group";
import { MinimalisticMagnifier } from "@solar-icons/react";
import { usePeopleTableStore } from "../../_stores/people-table-store";


export function PeopleSearch() {

    const search = usePeopleTableStore((s) => s.search)
    const setSearch = usePeopleTableStore((s) => s.setSearch)

    return (
        <InputGroup className="bg-input">
            <InputGroupInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..." />
            <InputGroupAddon>
                <MinimalisticMagnifier />
            </InputGroupAddon>
        </InputGroup>
    )
}