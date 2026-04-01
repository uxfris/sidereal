import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog"
import { AppSidebarMenuButton } from "./nav-item"
import { NavItem } from "../../_types/nav-item"
import { SmartKbd } from "@workspace/ui/components/smart-kbd"
import { useEffect, useState } from "react"
import { useShortcutRegister } from "@workspace/ui/components/shortcut-provider"

export function NavSearch({ item }: { item: NavItem }) {
    const [open, setOpen] = useState(false)
    const { register } = useShortcutRegister()

    useEffect(() => {
        register("search", () => setOpen((prev) => !prev))
    }, [])


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full">
                <AppSidebarMenuButton item={{
                    ...item,
                    badge: <div className="text-xs gap-0.5 px-1 py-0.5 rounded-sm border border-foreground/10 bg-muted brightness-95 group-data-[state=collapsed]:hidden">
                        <SmartKbd action="search" />
                    </div>
                }} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}