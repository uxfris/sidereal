"use client"

import { MenuDots, Pen, TrashBin2 } from "@solar-icons/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { Plus } from "lucide-react";
import { useState } from "react";

export function ChannelTitleMenuDropdown() {
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <MenuDots weight="Bold" className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-fit text-sm font-medium">
                    <DropdownMenuItem onSelect={() => setOpenAdd(true)} className="px-4 py-3">
                        <Plus />
                        Add meetings
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setOpenEdit(true)} className="px-4 py-3">
                        <Pen />
                        Edit channel
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setOpenDelete(true)} className="px-4 py-3 text-destructive">
                        <TrashBin2 />
                        Edit channel
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}


