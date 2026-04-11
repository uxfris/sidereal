"use client"

import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Field, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { toast } from "sonner";


export function ConfirmWorkspaceDeletionDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {

    const leaveWorkspace = () => {
        toast.success("Successfully deleted account");
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="space-y-4">
                <DialogHeader>
                    <DialogTitle>
                        Confirm workspace deletion
                    </DialogTitle>
                    <DialogDescription>
                        You own this workspace. To keep it, transfer ownership to another member before deleting your account
                    </DialogDescription>
                </DialogHeader>
                <div className="px-4 py-3 space-y-2 bg-secondary rounded-md">
                    <h3 className="text-sm text-muted-foreground">
                        Workspace
                    </h3>
                    <p className="text-base font-semibold">
                        Fris's Lume
                    </p>
                </div>
                <Field>
                    <FieldLabel className="normal-case text-sm font-semibold text-popover-foreground">
                        Type the workspace name to confirm
                    </FieldLabel>
                    <Input placeholder="Workspace name" />
                </Field>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">
                            Close
                        </Button>
                    </DialogClose>
                    <Button>
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}