import { NavItem } from "../../_types/nav-item"
import { SmartKbd } from "@workspace/ui/components/smart-kbd"
import { useEffect, useState } from "react"
import { useShortcutRegister } from "@workspace/ui/components/shortcut-provider"
import { SearchDialog } from "../search-dialog/search-dialog"
import { SidebarMenuButton } from "@workspace/ui/components/sidebar"



export function NavSearch({ item }: { item: NavItem }) {
    const [open, setOpen] = useState(false)

    const { register } = useShortcutRegister()

    useEffect(() => {
        register("search", () => setOpen((prev) => !prev))
    }, [])


    return (
        <>
            <SidebarMenuButton onClick={() => setOpen(true)}>
                <item.icon />
                <span className="flex-1">{item.label}</span>
                <span className="text-xs gap-0.5 px-1 py-0.5 rounded-sm border border-foreground/10 bg-muted brightness-95 group-data-[state=collapsed]:hidden">
                    <SmartKbd action="search" />
                </span>
            </SidebarMenuButton>
            <SearchDialog openSearch={open} onOpenSearchChange={setOpen} />
        </>
    )
}

