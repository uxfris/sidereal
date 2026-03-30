"use client"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { AppSidebarMenuButton } from "./nav-item";
import { NavItem } from "../../_types";
import { NavSearch } from "./nav-search";


export function SidebarGroupItem({ groupLabel, items }: { groupLabel?: string, items: NavItem[] }) {
    return (
        <SidebarGroup className="gap-2">
            {groupLabel && <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>}
            {items.map((item) => {
                if (item.isSearch) {
                    return <NavSearch key={item.label} item={item} />
                }
                return (<SidebarMenuItem key={item.label}>
                    <AppSidebarMenuButton item={item} />
                </SidebarMenuItem>)
            })}
        </SidebarGroup>
    )
}