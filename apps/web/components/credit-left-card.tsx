import { Button } from "@workspace/ui/components/button";
import { Progress } from "@workspace/ui/components/progress"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip";
import { ChevronRight } from "lucide-react";
import React from "react";
import Link from "next/link";

export function CreditLeftCard() {
    return (
        <div className="flex flex-col gap-2 p-3 bg-secondary rounded-sm">
            <Link href="/settings/billing" >
                <Button variant="ghost" className="w-full justify-between hover:opacity-75 hover:bg-transparent px-0 h-5">
                    <span className="text-xs font-semibold">Credits</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="text-xs font-semibold">3 Left</span>
                        <span><ChevronRight size={12} /></span>
                    </div>
                </Button>
            </Link>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Progress value={60} className="bg-muted brightness-90" />
                </TooltipTrigger>
                <TooltipContent side="top">
                    <span>3/5 monthly credits</span>
                </TooltipContent>
            </Tooltip>
            <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                <p className="text-muted-foreground text-[10px]">Monthly credits reset within 10 days</p>
            </div>
        </div>
    )
}