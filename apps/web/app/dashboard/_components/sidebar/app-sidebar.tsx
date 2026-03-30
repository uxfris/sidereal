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
import { NavMain } from "./nav-main";
import { NavMeeting } from "./nav-meeting";
import { navMain, navMeeting } from "../../_lib/data";




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
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}