import LogoIcon from "@/assets/icons/logo-icon";
import { SidebarMinimalistic } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { SmartKbd } from "@workspace/ui/components/smart-kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip";
import Link from "next/link";

export function SidebarBrand() {
    return (
        <div className="flex items-center justify-between mb-3">
            <Link href="https://sidereal.ai" className="size-7 ml-1"><LogoIcon /></Link>
            {/* Layout toggle */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon-xs" variant="ghost"><SidebarMinimalistic className="size-4" /></Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                    <p>Close Sidebar</p>
                    <p className="text-muted-foreground-2"><SmartKbd action="sidebar" /></p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}