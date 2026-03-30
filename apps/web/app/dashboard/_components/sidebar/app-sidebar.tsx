"use client"

import { ChecklistMinimalistic, Home, MinimalisticMagnifier, Star, User, UsersGroupRounded, Widget } from "@solar-icons/react";
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


const navMain = [
    {
        label: "Home",
        url: "/dashboard",
        icon: <Home />
    },
    {
        label: "Search",
        url: "#",
        icon: <MinimalisticMagnifier />
    },
    {
        label: "Tasks",
        url: "/dashboard/tasks",
        icon: <ChecklistMinimalistic />
    },
]

const navMeeting = [
    {
        label: "Meetings",
        url: "/dashboard/meetings",
        icon: <Widget />
    },
    {
        label: "Starred",
        url: "/dashboard/starred",
        icon: <Star />
    },
    {
        label: "Created by me",
        url: "/dashboard/created",
        icon: <User />
    },
    {
        label: "Shared with me",
        url: "/dashboard/shared",
        icon: <UsersGroupRounded />
    }
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="mt-2">
                <SidebarBrand />
                <WorkspaceSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
                <NavMeeting items={navMeeting} />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}