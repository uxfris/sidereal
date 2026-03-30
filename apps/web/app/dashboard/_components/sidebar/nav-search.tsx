import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog"
import { SmartKbd } from "@workspace/ui/components/smart-kbd"
import { AppSidebarMenuButton } from "./app-sidebar-menu-button"

export function NavSearchMenu({ item }: { item: { label: string, url: string, icon: React.ReactNode } }) {
    return (
        <Dialog>
            <DialogTrigger className="w-full">
                <AppSidebarMenuButton
                    href={item.url} label={item.label} icon={item.icon} badge={<div className="text-xs gap-0.5 px-1 py-0.5 rounded-sm border border-foreground/10 bg-muted brightness-95"><SmartKbd keys={["K"]} /></div>}
                />
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