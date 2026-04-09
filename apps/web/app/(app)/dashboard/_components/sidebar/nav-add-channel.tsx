import { Plus } from "lucide-react"
import { useState } from "react"
import { SidebarMenuButton } from "@workspace/ui/components/sidebar"
import { CreateChannelDialog } from "../../(meetings)/meetings/_components/create-channel-dialog"

export function NavAddChannel() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <SidebarMenuButton onClick={() => setOpen(true)}>
                <Plus />
                Add channel
            </SidebarMenuButton>
            <CreateChannelDialog open={open} onOpenChange={setOpen} />
        </>


    )
}