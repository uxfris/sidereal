import { ChecklistMinimalistic, Home, MinimalisticMagnifier, Star, User, UsersGroupRounded, Widget } from "@solar-icons/react"
import { NavItem } from "../_types"

export const navMain: NavItem[] = [
    {
        label: "Home",
        url: "/dashboard",
        icon: Home
    },
    {
        label: "Search",
        url: "#",
        icon: MinimalisticMagnifier,
    },
    {
        label: "Tasks",
        url: "/dashboard/tasks",
        icon: ChecklistMinimalistic,
    },
]

export const navMeeting: NavItem[] = [
    {
        label: "Meetings",
        url: "/dashboard/meetings",
        icon: Widget,
    },
    {
        label: "Starred",
        url: "/dashboard/starred",
        icon: Star,
    },
    {
        label: "Created by me",
        url: "/dashboard/created",
        icon: User,
    },
    {
        label: "Shared with me",
        url: "/dashboard/shared",
        icon: UsersGroupRounded,
    }
]