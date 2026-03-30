import { SidebarMenuButton } from "@workspace/ui/components/sidebar"
import { cn } from "@workspace/ui/lib/utils"
import Link from "next/link"

interface NavItemProps {
    href: string
    label: string
    icon: React.ReactNode
    active?: boolean
    badge?: React.ReactNode
}

export function AppSidebarMenuButton({ href, label, icon, active, badge }: NavItemProps) {
    return (
        <SidebarMenuButton
            asChild
            isActive={active}
            tooltip={label}
            className="py-5"
        >
            <a href={href}>
                <span className="size-3.5">{icon}</span>
                <span className="flex-1 text-sm">{label}</span>
                {badge}
            </a>
        </SidebarMenuButton>
    )
}