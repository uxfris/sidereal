import { Meeting } from "@workspace/types/meetings";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog";
import { toast } from "sonner";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@workspace/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@workspace/ui/components/input-group";
import { Hashtag, MinimalisticMagnifier } from "@solar-icons/react";
import { Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";
import { Badge } from "@workspace/ui/components/badge";

const MOCK_CHANNELS = [
    {
        id: "1",
        name: "Q4 Planning",
    },
    {
        id: "2",
        name: "Design Sprint",
    },
]

export function MoveMeeting({ meeting, open, onOpenChange, onCreateChannel }:
    { meeting: Meeting, open: boolean, onOpenChange: (open: boolean) => void, onCreateChannel: () => void }) {

    const moveMeeting = () => {
        toast.success("Meeting moved successfully")
        onOpenChange(false)
    }

    const currentChannelId = "1";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:min-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        Move to channel
                    </DialogTitle>
                    <DialogDescription>
                        Select a channel to move “{meeting.title}” to. A meeting can only be in one channel at a time.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 py-2">
                    <InputGroup autoFocus={false} className="bg-input h-12">
                        <InputGroupInput placeholder="Search folders..." className="font-medium" />
                        <InputGroupAddon className="size-6">
                            <MinimalisticMagnifier />
                        </InputGroupAddon>
                    </InputGroup>
                    <Button variant="outline" className="h-12 border-dashed w-full justify-start text-muted-foreground-2"
                        onClick={onCreateChannel}>
                        <Plus />
                        Create new channel
                    </Button>
                    <RadioGroup defaultValue={MOCK_CHANNELS[0]?.id} className="max-h-64 overflow-y-auto space-y-1">
                        <FieldLabel htmlFor="no-channel" className="py-1 has-data-checked:border-border has-data-checked:text-popover-foreground" >
                            <Field orientation="horizontal">
                                <RadioGroupItem value="no-channel" id="no-channel" />
                                <FieldContent>
                                    <FieldTitle className="text-sm font-semibold normal-case text-muted-foreground">
                                        No Folder
                                    </FieldTitle>
                                    {false &&
                                        <span>
                                            <Badge className="rounded-xs" variant="secondary">
                                                Current
                                            </Badge>
                                        </span>}
                                </FieldContent>
                            </Field>
                        </FieldLabel>
                        {MOCK_CHANNELS.map((channel) => (
                            <FieldLabel key={channel.id} htmlFor={channel.id} className="py-1 has-data-checked:border-border has-data-checked:text-popover-foreground" >
                                <Field orientation="horizontal">
                                    <RadioGroupItem value={channel.id} id={channel.id} />
                                    <FieldContent>
                                        <FieldTitle
                                            className="text-sm font-semibold normal-case ">
                                            {channel.name}
                                            {currentChannelId === channel.id &&
                                                <span>
                                                    <Badge className="rounded-xs" variant="secondary">
                                                        Current
                                                    </Badge>
                                                </span>}
                                        </FieldTitle>
                                    </FieldContent>
                                </Field>
                            </FieldLabel>
                        ))}
                    </RadioGroup>
                </div>
                <DialogFooter>
                    <div className="flex justify-end gap-3">
                        <DialogClose asChild>
                            <Button variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button onClick={moveMeeting}>
                            <Hashtag />
                            Move to channel
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
