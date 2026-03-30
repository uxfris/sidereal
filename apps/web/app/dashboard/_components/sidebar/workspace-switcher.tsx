import { Bolt, Settings, UserPlusRounded } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Progress } from "@workspace/ui/components/progress"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Badge } from "@workspace/ui/components/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip";
import { Check, ChevronDown, ChevronRight, Plus } from "lucide-react";
import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@workspace/ui/components/sidebar";

export function WorkspaceSwitcher() {

    const [workspace, setWorkspace] = React.useState("Fris's Sidereal")

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="bg-background py-3">
                            <div className="flex aspect-square size-8 items-center justify-center">
                                <span className="flex items-center justify-center rounded-[4px] bg-primary text-primary-foreground size-6 text-center text-xs font-medium -ml-4" aria-hidden="true">F</span>
                            </div>
                            <span className="flex-1 font-medium">Fris's Sidereal</span>
                            <ChevronDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="py-2 shadow-md ring-border w-[--radix-popper-anchor-width]" >
                        <div className="flex flex-col items-center gap-4 px-1">
                            {/* Workspace */}
                            <div className="flex items-center w-full gap-3">
                                {/* Avatar */}
                                <div className="flex items-center justify-center rounded-[4px] bg-primary text-primary-foreground w-9 h-9 text-center font-medium" aria-hidden="true">F</div>
                                {/* Workspace name */}
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-sm font-medium">Fris's Sidereal</span>
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="text-xs text-muted-foreground">Free Plan</span>
                                        <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                                        <span className="text-xs text-muted-foreground">1 member</span>
                                    </div>
                                </div>
                            </div>
                            {/* Menu */}
                            <div className="flex items-center gap-1.5 w-full">
                                <Button size="xs" variant="secondary" className="px-2 text-[11px]">
                                    <span> <Settings /></span>
                                    Settings</Button>
                                <Button size="xs" variant="secondary" className="px-2 text-[11px]">
                                    <UserPlusRounded />
                                    Invite members</Button>
                            </div>
                        </div>
                        <DropdownMenuSeparator className="my-2" />
                        {/* Credit */}
                        <div className="flex flex-col gap-2 px-1">
                            {/* Upgrade button */}
                            <div className="flex items-center justify-between p-3 bg-secondary rounded-sm">
                                <div className="flex items-center gap-1">
                                    <Bolt weight="Bold" size={20} />
                                    <span className="text-sm font-medium">Turn Pro</span>
                                </div>
                                <Button size="sm">Upgrade</Button>
                            </div>
                            {/* Credit left */}
                            <div className="flex flex-col gap-2 p-3 bg-secondary rounded-sm">
                                <Button variant="ghost" className="justify-between hover:opacity-75 px-0 h-5">
                                    <span className="text-xs font-semibold">Credits</span>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <span className="text-xs font-semibold">3 Left</span>
                                        <span><ChevronRight size={12} /></span>
                                    </div>
                                </Button>
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
                        </div>
                        <DropdownMenuSeparator className="my-2" />
                        {/* Workspaces */}
                        <div className="flex flex-col gap-3 py-2">
                            <DropdownMenuLabel className="px-4">All workspace</DropdownMenuLabel>
                            <DropdownMenuRadioGroup value={workspace} onValueChange={setWorkspace}>
                                <DropdownMenuRadioItem value={"Fris's Sidereal"} className="mx-1 px-2 py-2">
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center justify-center rounded-[4px] bg-primary text-primary-foreground! w-6 h-6 text-center text-xs font-medium" aria-hidden="true">F</span>
                                        <span className="text-xs">Fris's Sidereal</span>
                                        <Badge variant="secondary">Free</Badge>
                                    </div>
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>

                        </div>
                        <DropdownMenuSeparator className="my-2" />
                        <DropdownMenuItem className="gap-3 mx-1 px-2 py-2">
                            <span className="flex items-center justify-center w-6 h-6 bg-accent brightness-95 text-muted-foreground rounded-sm"><Plus size={16} /></span>
                            <span className="text-xs">Create new workspace</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}