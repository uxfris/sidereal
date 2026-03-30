import { Icon } from "@solar-icons/react/lib/types"
import { SidebarMenuButton } from "@workspace/ui/components/sidebar"
import { cn } from "@workspace/ui/lib/utils"
import Link from "next/link"

interface NavItemProps {
    href: string
    label: string
    icon: Icon
    isActive?: boolean
    badge?: React.ReactNode
}

export function AppSidebarMenuButton({ href, label, icon: Icon, isActive, badge }: NavItemProps) {
    return (
        <SidebarMenuButton
            asChild
            isActive={isActive}
            tooltip={label}
            className="py-5"
        >
            <a href={href}>
                <span className="size-3.5"><Icon /></span>
                <span className="flex-1 text-sm">{label}</span>
                {badge}
            </a>
        </SidebarMenuButton>
    )
}