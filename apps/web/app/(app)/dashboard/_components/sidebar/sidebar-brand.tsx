import LogoIcon from "@/assets/icons/logo-icon";
import Link from "next/link";
import { ToggleSidebarButton } from "./toggle-sidebar-button";

export function SidebarBrand() {

    return (
        <div className="flex items-center justify-between mb-3">
            <div className="relative group/logo flex items-center justify-center">
                <Link href="/" className="size-7 ml-1 transition-opacity duration-200 group-data-[state=collapsed]:group-hover/logo:opacity-0"><LogoIcon /></Link>
                <ToggleSidebarButton tooltip="Open Sidebar" className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-data-[state=collapsed]:group-hover/logo:opacity-100" />
            </div>
            <ToggleSidebarButton tooltip="Close Sidebar" className="group-data-[state=collapsed]:hidden" />
        </div>
    )
}

