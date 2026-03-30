"use client"

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@workspace/ui/components/dialog"
import { AppSidebarMenuButton } from "./nav-item";
import { NavItem } from "../../_types";
import { NavSearchDialog } from "./nav-search-dialog";
import { SearchBadge } from "./nav-search-badge";


export function SidebarGroupItem({ groupLabel, items }: { groupLabel?: string, items: NavItem[] }) {
    return (
        <SidebarGroup>
            {groupLabel && <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>}
            {items.map((item) => {
                if (item.type === 'dialog') {
                    return (
                        <Dialog key={item.label}>
                            <DialogTrigger className="w-full">
                                <AppSidebarMenuButton item={{
                                    ...item,
                                    badge: item.isSearch ? <SearchBadge /> : undefined
                                }} />
                            </DialogTrigger>
                            <DialogContent>
                                {item.isSearch && <NavSearchDialog />}
                            </DialogContent>
                        </Dialog>
                    )
                }
                return (<SidebarMenuItem key={item.url}>
                    <AppSidebarMenuButton item={item} />
                </SidebarMenuItem>)
            })}
        </SidebarGroup>
    )
}