import { ChecklistMinimalistic, Home, LayersMinimalistic, MinimalisticMagnifier, Star, User, UsersGroupRounded, Widget } from "@solar-icons/react"
import { NavItem } from "../_types"

const navMain: NavItem[] = [
    {
        label: "Home",
        url: "/dashboard",
        icon: Home
    },
    {
        label: "Search",
        url: "#",
        icon: MinimalisticMagnifier,
        isSearch: true
    },
    {
        label: "Tasks",
        url: "/dashboard/tasks",
        icon: ChecklistMinimalistic,
    },
]

const navMeetings: NavItem[] = [
    {
        label: "Meetings",
        url: "/dashboard/meetings",
        icon: Widget,
        isMeetings: true,
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

const navUploads: NavItem[] = [{
    label: "Uploads",
    url: "/dashboard/uploads",
    icon: ChecklistMinimalistic,
}]

const navIntegrations: NavItem[] = [{
    label: "Integrations",
    url: "/dashboard/integrations",
    icon: LayersMinimalistic,
}]

export { navMain, navMeetings, navUploads, navIntegrations };