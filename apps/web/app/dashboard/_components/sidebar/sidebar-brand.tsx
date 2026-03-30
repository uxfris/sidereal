import LogoIcon from "@/assets/icons/logo-icon";
import { SidebarMinimalistic } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { SidebarMenuButton, useSidebar } from "@workspace/ui/components/sidebar";
import { SmartKbd } from "@workspace/ui/components/smart-kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip";
import Link from "next/link";

export function SidebarBrand() {
    const { toggleSidebar } = useSidebar()
    return (
        <div className="flex items-center justify-between mb-3">
            <div className="relative group/logo flex items-center justify-center">
                <Link href="https://sidereal.ai" className="size-7 ml-1 transition-opacity duration-200 group-data-[state=collapsed]:group-hover/logo:opacity-0"><LogoIcon /></Link>
                <Button onClick={toggleSidebar} size="icon-xs" variant="ghost" className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-data-[state=collapsed]:group-hover/logo:opacity-100"><SidebarMinimalistic className="size-4" /></Button>
            </div>
            {/* Layout toggle */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={toggleSidebar} size="icon-xs" variant="ghost" className="group-data-[state=collapsed]:hidden"><SidebarMinimalistic className="size-4" /></Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>Close Sidebar</p>
                    <p className="text-muted-foreground-2"><SmartKbd action="sidebar" /></p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}