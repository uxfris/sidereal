import { SidebarMenuButton } from "@workspace/ui/components/sidebar"
import { NavItem } from "../../_types/nav-item";

export function AppSidebarMenuButton({ item }: { item: NavItem }) {
    const { url, label, icon: Icon, active, badge } = item;
    return (
        <SidebarMenuButton
            asChild
            isActive={active}
            tooltip={label}
            className="py-3"
        >
            <a href={url}>
                <span className="size-3.5"> {<Icon />}</span>
                <span className="flex-1 text-sm transition-all duration-200 ease-out group-data-[state=collapsed]:opacity-0"> {label}</span>
                {badge}
            </a>
        </SidebarMenuButton>
    )
}