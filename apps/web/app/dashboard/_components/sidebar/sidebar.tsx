"use client"

import LogoIcon from "@/assets/icons/logo-icon";
import { SidebarMinimalistic } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col h-full px-3 py-5 gap-3">
            <div className="flex items-center justify-between">
                {/* Top icons */}
                <Link href="https://sidereal.ai" className="size-7 ml-1"><LogoIcon /></Link>
                {/* Layout toggle */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size="icon-sm" variant="ghost"><SidebarMinimalistic className="size-5" /></Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>Close Sidebar</p>
                        <p className="text-muted-foreground-2">⌘.</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            {/* Workspace switcher */}
            <WorkspaceSwitcher />
            {/* Main nav */}
            {/* Meeting section */}
            {/* Upload section */}
            {/* Integrations section */}
            {/* Spacer */}
            {/* Footer */}

        </div>
    )
}