import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@workspace/ui/components/dialog"
import { AppSidebarMenuButton } from "./nav-item"
import { Plus } from "lucide-react"

export function NavAddChannel() {
    return (
        <Dialog>
            <DialogTrigger className="w-full">
                <AppSidebarMenuButton item={{
                    label: "Add Channel",
                    url: "#",
                    icon: Plus,
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