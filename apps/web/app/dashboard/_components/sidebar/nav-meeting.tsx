import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from "@workspace/ui/components/sidebar";
import { NavCollapsibleMeetings } from "./nav-collapsible-meetings";
import { AppSidebarMenuButton } from "./nav-item";

export function NavMeeting({ items }: { items: { label: string, url: string, icon: React.ReactNode }[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Meetings</SidebarGroupLabel>
            <SidebarMenu className="gap-0.5">

                {items.map((item) => (
                    item.label.toLowerCase() === "meetings" ?
                        <NavCollapsibleMeetings key={item.label} item={{
                            label: item.label,
                            url: item.url,
                            icon: item.icon
                        }} /> :
                        <SidebarMenuItem key={item.url}>
                            <AppSidebarMenuButton
                                href={item.url} label={item.label} icon={item.icon}
                            />
                        </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}