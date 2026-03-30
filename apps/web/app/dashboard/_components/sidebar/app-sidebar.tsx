"use client"

import { usePathname } from "next/navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { SidebarBrand } from "./sidebar-brand";
import { NavMain } from "./nav-main";
import { NavMeeting } from "./nav-meeting";
import { navIntegrations, navMain, navMeeting, navUploads } from "../../_lib/data";
import { AppSidebarMenuButton } from "./nav-item";
import { NavItem } from "../../_types";




export function AppSidebar() {
    const pathname = usePathname()

    const isActive = (url: string) => {
        if (url === "#") return false
        return pathname === url
    }

    const navMainWithState = navMain.map((item => ({
        ...item,
        active: isActive(item.url)
    })))

    const navMeetingWithState = navMeeting.map((item => ({
        ...item,
        active: isActive(item.url)
    })))

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="mt-2">
                <SidebarBrand />
                <WorkspaceSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMainWithState} />
                <NavMeeting items={navMeetingWithState} />
                <SidebarGroupItem item={navUploads} />
                <SidebarGroupItem item={navIntegrations} />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}

function SidebarGroupItem({ item }: { item: NavItem }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{item.label}</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <AppSidebarMenuButton url={item.url} label={item.label} icon={item.icon} active={item.active} />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    )
}