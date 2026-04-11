"use client"

import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Field, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";


export function ConfirmEmailDialog({ open, onOpenChange, onContinue }: { open: boolean, onOpenChange: (open: boolean) => void, onContinue: () => void }) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="space-y-4">
                <DialogHeader>
                    <DialogTitle>
                        Confirm email
                    </DialogTitle>
                    <DialogDescription>
                        Type your email address to confirm: fris@lume.com
                    </DialogDescription>
                </DialogHeader>
                <Field>
                    <FieldLabel className="normal-case text-sm font-semibold text-popover-foreground">
                        Type your email address to confirm
                    </FieldLabel>
                    <Input placeholder="email@domain.com" />
                </Field>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">
                            Close
                        </Button>
                    </DialogClose>
                    <Button onClick={onContinue}>
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}