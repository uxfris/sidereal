"use client"

import { MenuDots } from "@solar-icons/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { Plus } from "lucide-react";
import { useState } from "react";
import { TitleMenuDialog } from "./meeting-title-menu-dialog";

export function TitleMenuDropdown() {
    const [dialogOpen, setDialogOpen] = useState(false)
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <MenuDots weight="Bold" className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-fit">
                    <DropdownMenuItem onSelect={() => setDialogOpen(true)} className="text-sm font-medium px-4 py-3">
                        <Plus />
                        Add Channel
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <TitleMenuDialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)} />
        </>
    )
}

