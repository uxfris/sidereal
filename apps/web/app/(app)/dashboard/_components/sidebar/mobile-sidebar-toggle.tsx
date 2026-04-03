"use client"


import LogoIcon from "@/assets/icons/logo-icon";
import { HamburgerMenu } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { DropdownUserMenu } from "./nav-dropdown-user-menu";
import Link from "next/link";

export function MobileHeader() {
    return (
        <div className="md:hidden flex items-center justify-between py-2">
            <Button variant="ghost" size="icon"><HamburgerMenu className="size-6" /></Button>
            <Link href="/" className="flex items-center gap-1">
                <span className="w-8">
                    <LogoIcon />
                </span>
                <span className="text-xl font-medium">Lume</span>
            </Link>
            <DropdownUserMenu className="size-7" />

        </div>
    )
}