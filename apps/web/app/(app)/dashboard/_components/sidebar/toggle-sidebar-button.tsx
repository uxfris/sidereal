import { SidebarMinimalistic } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { useSidebar } from "@workspace/ui/components/sidebar";
import { SmartKbd } from "@workspace/ui/components/smart-kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip";

export function ToggleSidebarButton({ tooltip, className }: { tooltip: string, className: string }) {
    const { toggleSidebar } = useSidebar()
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button onClick={toggleSidebar} size="icon-xs" variant="ghost" className={className}><SidebarMinimalistic className="size-4" /></Button>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>{tooltip}</p>
                <p className="text-muted-foreground-2"><SmartKbd action="sidebar" /></p>
            </TooltipContent>
        </Tooltip>
    )
}