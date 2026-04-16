import { Meeting } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { toast } from "sonner";
import { Field, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";


export function RenameMeeting({ meeting, open, onOpenChange }: { meeting: Meeting, open: boolean, onOpenChange: (open: boolean) => void }) {
    const renameMeeting = () => {
        onOpenChange(false)
        toast.success("Meeting renamed successfully")
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:min-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Rename Meeting
                    </DialogTitle>
                    <DialogDescription>
                        Update how this meeting appears in your workspace.
                    </DialogDescription>
                </DialogHeader>
                <Field>
                    <FieldLabel htmlFor="meeting-name">
                        Display Name
                    </FieldLabel>
                    <Input autoFocus id="meeting-name" defaultValue={meeting.title} placeholder="Enter meeting title" />
                </Field>
                <DialogFooter>
                    <div className="flex justify-end gap-3">
                        <DialogClose asChild>
                            <Button variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button onClick={renameMeeting}>Save</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
