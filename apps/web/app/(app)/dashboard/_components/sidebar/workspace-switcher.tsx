import { Bolt, Settings, UserPlusRounded } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
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
import { ChevronDown, Plus } from "lucide-react";
import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@workspace/ui/components/sidebar";
import Link from "next/link";
import { CreditLeftCard } from "@/components/credit-left-card";

export function WorkspaceSwitcher() {

    const [workspace, setWorkspace] = React.useState("Fris's Lume")

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="bg-background py-3">
                            <div className="flex aspect-square size-8 items-center justify-center">
                                <span className="flex items-center justify-center rounded-[4px] bg-primary text-primary-foreground size-6 text-center text-xs font-medium -ml-4" aria-hidden="true">F</span>
                            </div>
                            <span className="flex-1 truncate font-medium group-data-[state=collapsed]:hidden">Fris's Lume</span>
                            <ChevronDown className="ml-auto group-data-[state=collapsed]:hidden" />
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
                                    <span className="text-sm font-medium">Fris's Lume</span>
                                    <div className="flex items-center justify-center gap-1">
                                        <span className="text-xs text-muted-foreground">Free Plan</span>
                                        <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                                        <span className="text-xs text-muted-foreground">1 member</span>
                                    </div>
                                </div>
                            </div>
                            {/* Menu */}
                            <div className="flex items-center gap-1 w-full">
                                <Link href="/settings/workspace">
                                    <Button size="xs" variant="ghost" className="px-2 text-[11px]" >
                                        <span> <Settings /></span>
                                        Settings</Button>
                                </Link>
                                <Link href="/settings/people?invite=true">
                                    <Button size="xs" variant="ghost" className="px-2 text-[11px]">
                                        <UserPlusRounded />
                                        Invite members</Button>
                                </Link>
                            </div>
                        </div>
                        <DropdownMenuSeparator className="my-2" />
                        {/* Credit */}
                        <div className="flex flex-col gap-2 px-1">
                            {/* Upgrade button. Visibility depends on the workspace ownerships*/}
                            <div className="flex items-center justify-between p-3 bg-secondary rounded-sm">
                                <div className="flex items-center gap-1">
                                    <Bolt weight="Bold" size={20} />
                                    <span className="text-sm font-medium">Turn Pro</span>
                                </div>
                                <Button size="sm">Upgrade</Button>
                            </div>
                            {/* Credit left */}
                            <CreditLeftCard />
                        </div>
                        <DropdownMenuSeparator className="my-2" />
                        {/* Workspaces */}
                        <div className="flex flex-col gap-3 py-2">
                            <DropdownMenuLabel className="px-4">All workspace</DropdownMenuLabel>
                            <DropdownMenuRadioGroup value={workspace} onValueChange={setWorkspace}>
                                <DropdownMenuRadioItem value={"Fris's Lume"} className="mx-1 px-2 py-2">
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center justify-center rounded-[4px] bg-primary text-primary-foreground! w-6 h-6 text-center text-xs font-medium" aria-hidden="true">F</span>
                                        <span className="text-xs">Fris's Lume</span>
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
        </SidebarMenu >
    )
}