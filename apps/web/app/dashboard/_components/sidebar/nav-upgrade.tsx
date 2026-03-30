import { Bolt } from "@solar-icons/react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@workspace/ui/components/sidebar"

export default function NavUpgrade() {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton className="justify-between border border-foreground/10 rounded-lg py-8 px-4 hover:bg-primary/10">
                <div className="flex flex-col">
                    <span className="text-sm font-semibold">Upgrade to Pro</span>
                    <span className="text-xs text-muted-foreground">Unlock more benefits</span>
                </div>
                <div className="w-8 h-8 bg-accent flex items-center justify-center rounded-full">
                    <Bolt size={5} weight="Bold" />
                </div>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}