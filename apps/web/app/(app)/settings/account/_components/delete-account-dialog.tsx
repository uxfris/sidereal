"use client"

import { ClockCircle } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { Field, FieldLabel, FieldLegend, FieldSet } from "@workspace/ui/components/field";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";


export function DeleteAccountDialog({ open, onOpenChange, onContinue }: { open: boolean, onOpenChange: (open: boolean) => void, onContinue: () => void }) {

    const REASONS = [
        {
            value: "not-useful",
            name: "I didn't find the product useful"
        },
        {
            value: "confusing",
            name: "It's too confusing"
        },
        {
            value: "missing-features",
            name: "Missing features"
        },
        {
            value: "too-expensive",
            name: "Too expensive"
        },
        {
            value: "privacy-concerns",
            name: "Privacy concerns"
        },
        {
            value: "switching-product",
            name: "I'm switching to a different product"
        },
        {
            value: "duplicate-account",
            name: "This is a duplicated account"
        },
        {
            value: "other",
            name: "Other"
        }
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="space-y-1">
                <DialogHeader>
                    <DialogTitle>
                        Delete your account
                    </DialogTitle>
                    <DialogDescription>
                        This action is permanent and cannot be undone
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 p-4 bg-destructive/30 rounded-md border border-destructive">
                    <h2 className="text-base font-medium text-destructive">
                        This will permanently delete:
                    </h2>
                    <ul className="list-disc pl-6 text-sm text-destructive">
                        <li>
                            Your active subscriptions
                        </li>
                        <li>
                            Any workspaces you own, unless you transferred ownership
                        </li>
                        <li>
                            Your workspace memberships and invitations
                        </li>
                        <li>
                            Your account and all associated data
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-2 p-4 bg-secondary rounded-md">
                    <ClockCircle />
                    <span className="text-sm">
                        Deletion will be scheduled for <span className="font-semibold">May 10, 2026.</span>
                    </span>
                </div>
                <FieldSet className="gap-3">
                    <FieldLegend className="text-sm! font-medium text-muted-foreground">
                        Why are you deleting this account?
                    </FieldLegend>
                    <RadioGroup>
                        {REASONS.map((reason) => (
                            <Field key={reason.value} orientation="horizontal">
                                <RadioGroupItem value={reason.value} />
                                <FieldLabel className="text-sm normal-case font-medium text-popover-foreground">
                                    {reason.name}
                                </FieldLabel>
                            </Field>
                        )
                        )}
                    </RadioGroup>
                </FieldSet>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost" className="flex-1">
                            Close
                        </Button>
                    </DialogClose>
                    <Button onClick={onContinue} variant="destructive" className="flex-1">
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>

        </Dialog >
    )
}