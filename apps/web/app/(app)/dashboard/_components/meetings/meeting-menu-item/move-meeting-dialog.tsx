import { Meeting } from "@workspace/types/meetings";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { toast } from "sonner";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@workspace/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@workspace/ui/components/input-group";
import { MinimalisticMagnifier } from "@solar-icons/react";
import { Plus } from "lucide-react";
import { RadioGroup } from "@workspace/ui/components/radio-group";

export function MoveMeeting({ meeting, open, onOpenChange }: { meeting: Meeting, open: boolean, onOpenChange: (open: boolean) => void }) {

    const moveMeeting = () => {
        toast.success("Meeting moved successfully")
        onOpenChange(false)
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Move to channel
                    </DialogTitle>
                    <DialogDescription>
                        Select a channel to move “{meeting.title}” to. A meeting can only be in one channel at a time.
                    </DialogDescription>
                    <div className="place-y-3">
                        <InputGroup>
                            <InputGroupInput placeholder="Search folders..." />
                            <InputGroupAddon>
                                <MinimalisticMagnifier />
                            </InputGroupAddon>
                        </InputGroup>
                        <Button variant="outline" className="border-dashed">
                            <Plus />
                            Create new channel
                        </Button>
                        {["1", "2", "3"].map((channel) => (
                            <RadioGroup>
                                <FieldLabel htmlFor={channel}>
                                    <Field orientation="horizontal">
                                        <FieldContent>
                                            <RadioGroup value={channel} id={channel} />
                                            <FieldTitle> Side Projects</FieldTitle>
                                        </FieldContent>
                                    </Field>
                                </FieldLabel>
                            </RadioGroup>
                        ))}
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex justify-end gap-3">
                        <DialogClose asChild>
                            <Button variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button onClick={moveMeeting}>
                            Move to channel
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
