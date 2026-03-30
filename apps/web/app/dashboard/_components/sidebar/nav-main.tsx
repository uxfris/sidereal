import { SidebarGroup, SidebarMenu, SidebarMenuItem } from "@workspace/ui/components/sidebar";
import { AppSidebarMenuButton } from "./nav-item";
import { NavSearchMenu } from "./nav-search";



export function NavMain({ items }: { items: { label: string, url: string, icon: React.ReactNode }[] }) {
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
                                href={item.url} label={item.label} icon={item.icon}
                            />
                        </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}