import { SidebarMenuButton } from "@workspace/ui/components/sidebar"
import { NavItem } from "../../_types/nav-item";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebarMenuButton({ item }: { item: NavItem }) {
    const pathname = usePathname();
    const { url, label, icon: Icon, badge } = item;
    const isActive = pathname === (url === "/dashboard" ? false : url);
    return (
        <SidebarMenuButton
            asChild
            isActive={isActive}
            tooltip={label}
            className="py-3"
        >
            <Link href={url}>
                <span className="size-3.5"> {<Icon />}</span>
                <span className="flex-1 text-sm line-clamp-1 transition-all duration-200 ease-out group-data-[state=collapsed]:opacity-0"> {label}</span>
                {badge}
            </Link>
        </SidebarMenuButton>
    )
}