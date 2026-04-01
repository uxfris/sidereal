"use client"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { AppSidebarMenuButton } from "./nav-item";
import { NavItem } from "../../_types/nav-item";
import { NavSearch } from "./nav-search";
import { NavMeetings } from "./nav-meetings";


export function SidebarGroupItem({ groupLabel, items }: { groupLabel?: string, items: NavItem[] }) {
    return (
        <SidebarGroup>
            {groupLabel && <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>}
            <SidebarMenu className="gap-2">
                {items.map((item) => {
                    if (item.isSearch) {
                        return <NavSearch key={item.label} item={item} />
                    }
                    if (item.isMeetings) {
                        return <NavMeetings key={item.label} item={item} />
                    }
                    return (<SidebarMenuItem key={item.label}>
                        <AppSidebarMenuButton item={item} />
                    </SidebarMenuItem>)
                })}
            </SidebarMenu>
        </SidebarGroup>
    )
}