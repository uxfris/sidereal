"use client"

import { Button } from "@workspace/ui/components/button";
import LogoIcon from "@/assets/icons/logo-icon";
import Link from "next/link";

export function StarredEmpty() {

    return (
        <div className="px-10 pb-10 h-full">
            <div className="flex flex-col items-center justify-center gap-8 h-full pb-10 bg-card rounded-md">
                <div className="w-12">
                    <LogoIcon color="#2B3437" />
                </div>
                <h1 className="text-xl font-semibold">
                    Star meetings to access them quickly from any workspace
                </h1>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/meettings">
                        Browse meetings
                    </Link>
                </Button>
            </div>
        </div>
    )
}