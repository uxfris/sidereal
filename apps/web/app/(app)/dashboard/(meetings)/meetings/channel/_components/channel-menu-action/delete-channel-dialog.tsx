"use client"

import { DangerTriangle } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { toast } from "sonner";


export function DeleteChannelDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {

    const deleteChannel = () => {
        toast.success("Channel deleted successfully")
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete channel
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete “Marketing” channel?
                        <br />
                        Projects won't be deleted, only the channel.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 bg-destructive/20 rounded-md p-4">
                    <DangerTriangle size={16} className="text-destructive pt-1" />
                    <div className="space-y-2">
                        <h2 className="text-destructive font-semibold">
                            Projects will keep their workspace visibility
                        </h2>
                        <p className="text-destructive">
                            They will remain accessible to other workspace members unless moved.
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={deleteChannel}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}