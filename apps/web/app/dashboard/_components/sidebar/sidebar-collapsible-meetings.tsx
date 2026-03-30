"use client"

import { AddFolder, Folder, Pen, TrashBin2, Widget } from "@solar-icons/react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"

import {
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from "@workspace/ui/components/sidebar"
import { ChevronRight, MoreHorizontal, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { MoveToFolder } from "@solar-icons/react/ssr";

export function SidebarCollapsibleMeetings({ item }: { item: { label: string, url: string, icon: React.ReactNode } }) {
    return (
        <Collapsible
            asChild
            defaultOpen={false}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Meetings" className="py-5">
                        {item.icon}
                        <span>{item.label}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild>
                                <div>
                                    <AddFolder />
                                    <span>New folder</span>
                                </div>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild>
                                <a href={"/side-projects"}>
                                    <Folder />
                                    <span>Side Projects</span>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <MoreHorizontal className="ml-auto" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-full">
                                            <DropdownMenuItem>
                                                <Plus />
                                                Add meetings
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <AddFolder />
                                                Create subfolder
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <MoveToFolder />
                                                Move folder
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Pen />
                                                Edit folder
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem variant="destructive">
                                                <TrashBin2 />
                                                Delete folder
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </a>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    )
}