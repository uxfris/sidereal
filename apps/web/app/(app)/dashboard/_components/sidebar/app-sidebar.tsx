"use client"

import { WorkspaceSwitcher } from "./workspace-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
} from "@workspace/ui/components/sidebar"

import { SidebarBrand } from "./sidebar-brand";
import { navIntegrations, navMain, navMeetings, navUploads } from "../../_lib/nav-item-data";
import { SidebarGroupItem } from "./sidebar-group-item";
import NavUpgrade from "./nav-upgrade";
import { NavUser } from "./nav-user";




export function AppSidebar() {

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarBrand />
                <WorkspaceSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroupItem items={navMain} />
                <SidebarGroupItem groupLabel="Meetings" items={navMeetings} />
                <SidebarGroupItem groupLabel="Uploads" items={navUploads} />
                <SidebarGroupItem groupLabel="Integrations" items={navIntegrations} />
            </SidebarContent>
            <SidebarFooter >
                <SidebarMenu className="gap-2">
                    <NavUpgrade />
                    <NavUser />
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}


