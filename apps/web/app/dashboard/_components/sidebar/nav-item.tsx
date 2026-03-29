import { cn } from "@workspace/ui/lib/utils"
import Link from "next/link"

interface NavItemProps {
    href: string
    label: string
    icon: React.ReactNode
    badge?: React.ReactNode
    active?: boolean
}

export function NavItem({ href, label, icon, badge, active }: NavItemProps) {
    return (
        <Link href={href} className={cn(
            "flex items-center gap-2 p-2 rounded-lg text-sm transition-colors",
            "text-sidebar-foreground, hover:text-sidebar-primary-foreground hover:bg-primary-foreground",
            active && "text-sidebar-primary-foreground bg-sidebar-primary"
        )}>
            <span className="size-3.5">{icon}</span>
            <span className="flex-1">{label}</span>
            {badge && (
                <span>{badge}</span>
            )}
        </Link>
    )
}