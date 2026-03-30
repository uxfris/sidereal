"use client"

import { usePathname } from "next/navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@workspace/ui/components/sidebar"

import { SidebarBrand } from "./sidebar-brand";
import { navIntegrations, navMain, navMeetings, navUploads } from "../../_lib/data";
import { NavItem } from "../../_types";
import { SidebarGroupItem } from "./sidebar-group-item";




export function AppSidebar() {
    const pathname = usePathname()

    const isActive = (url: string) => {
        if (url === "#") return false
        return pathname === url
    }

    const withState = (items: NavItem[]) => items.map((item => ({
        ...item,
        active: isActive(item.url)
    })))

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarBrand />
                <WorkspaceSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroupItem items={withState(navMain)} />
                <SidebarGroupItem groupLabel="Meetings" items={withState(navMeetings)} />
                <SidebarGroupItem groupLabel="Uploads" items={withState(navUploads)} />
                <SidebarGroupItem groupLabel="Integrations" items={withState(navIntegrations)} />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}


