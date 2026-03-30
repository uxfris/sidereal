import { SidebarGroup, SidebarMenu, SidebarMenuItem } from "@workspace/ui/components/sidebar";
import { AppSidebarMenuButton } from "./nav-item";
import { NavSearchMenu } from "./nav-search";
import { Icon } from "@solar-icons/react/lib/types";
import { NavItem } from "../../_types";



export function NavMain({ items }: { items: NavItem[] }) {
    return (
        <SidebarGroup>
            <SidebarMenu className="gap-0.5">
                {items.map((item) => (
                    item.label.toLowerCase() === "search" ?
                        <NavSearchMenu key={item.label} item={{
                            label: item.label,
                            url: item.url,
                            icon: item.icon
                        }} />
                        : <SidebarMenuItem key={item.label}>
                            <AppSidebarMenuButton
                                href={item.url} label={item.label} icon={item.icon} isActive={item.active} />
                        </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}