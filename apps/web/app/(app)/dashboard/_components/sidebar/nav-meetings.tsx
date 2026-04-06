import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@workspace/ui/components/sidebar"
import { NavItem } from "../../_types/nav-item"
import { ChevronRight } from "lucide-react"
import { AppSidebarMenuButton } from "./nav-item"
import { Button } from "@workspace/ui/components/button"
import { Folder, Hashtag } from "@solar-icons/react"
import { NavAddChannel } from "./nav-add-channel"

export function NavMeetings({ item }: { item: NavItem }) {
    return (
        <Collapsible className="group/collapsible">
            <SidebarMenuItem className="group/trigger px-1 flex items-center hover:bg-sidebar-accent rounded-md gap-0.5">

                {/* ICON ZONE (becomes trigger on hover) */}
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon-xs" className="w-6 h-6 transition bg-sidebar group-data-[state=open]/collapsible:bg-sidebar">
                        {/* Default icon */}
                        <item.icon className="
                        text-foreground
                            size-3.5
                            opacity-100
                            group-hover/trigger:opacity-0
                            transition
                        " />

                        {/* Chevron on hover */}
                        <ChevronRight className="
                            absolute
                            size-3.5
                            opacity-0
                            group-hover/trigger:opacity-100
                            transition
                            group-data-[state=open]/collapsible:rotate-90
                        " />
                    </Button>
                </CollapsibleTrigger>

                {/* Navigation area*/}
                <SidebarMenuButton asChild tooltip={item.label} className="p-0">
                    <a href={item.url} className="flex items-center gap-2">
                        <span className="ml-0">{item.label}</span>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>

            <CollapsibleContent>
                <SidebarMenuSub className="border-zinc-200 dark:border-zinc-800">
                    <SidebarMenuSubItem >
                        <NavAddChannel />
                    </SidebarMenuSubItem>
                    {[{ icon: Hashtag, label: "Side Projects", url: "/dashboard/meetings/side-projects" }].map((subItem) => (
                        <SidebarMenuSubItem key={subItem.label}>
                            <AppSidebarMenuButton item={subItem} />
                        </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
            </CollapsibleContent>
        </Collapsible>
    )
}