"use client"

import { MinimalisticMagnifier } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@workspace/ui/components/input-group";
import { Checkbox } from "@workspace/ui/components/checkbox";



export function AddMeetingToChannelDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add meetings to channel
                    </DialogTitle>
                    <DialogDescription>
                        Select meetings to add this channel. A meeting can only be in one channel at a time.
                    </DialogDescription>
                </DialogHeader>
                <InputGroup className="bg-input h-10">
                    <InputGroupInput placeholder="Search meetings..." />
                    <InputGroupAddon>
                        <MinimalisticMagnifier />
                    </InputGroupAddon>
                </InputGroup>
                <div className="max-h-64 overflow-y-auto space-y-3">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((channel) => (
                        <div key={channel}
                            className="flex items-center justify-between border border-border rounded-md p-4 hover:bg-secondary group/button cursor-pointer">
                            <span className="text-sm font-medium text-popover-foreground">Product Roadmap Review</span>
                            <Checkbox
                                className="w-5 h-5 group-hover/button:brightness-75"
                                onClick={(e) => e.stopPropagation()} />
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button>Add 2 projects</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}