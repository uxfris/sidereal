import { Icon } from "@solar-icons/react/lib/types"
import { SidebarMenuButton } from "@workspace/ui/components/sidebar"
import { NavItem } from "../../_types"

export function AppSidebarMenuButton({ url, label, icon: Icon, active, badge }: NavItem) {
    return (
        <SidebarMenuButton
            asChild
            isActive={active}
            tooltip={label}
            className="py-5"
        >
            <a href={url}>
                <span className="size-3.5"><Icon /></span>
                <span className="flex-1 text-sm">{label}</span>
                {badge}
            </a>
        </SidebarMenuButton>
    )
}