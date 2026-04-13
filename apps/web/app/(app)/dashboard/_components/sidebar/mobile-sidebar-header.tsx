"use client"


import LogoIcon from "@/assets/icons/logo-icon";
import { HamburgerMenu } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { DropdownUserMenu } from "./nav-dropdown-user-menu";
import Link from "next/link";
import { useSidebar } from "@workspace/ui/components/sidebar";

export function MobileHeader() {

    const { toggleSidebar } = useSidebar()

    return (
        <div className="md:hidden flex items-center justify-between py-2 bg-background">
            <Button variant="ghost" size="icon" onClick={() => toggleSidebar()}><HamburgerMenu className="size-6" /></Button>
            <Link href="/" className="flex items-center gap-1">
                <LogoIcon />
                <span className="text-xl font-medium">Lume</span>
            </Link>
            <DropdownUserMenu className="size-7" />

        </div>
    )
}