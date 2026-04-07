import { FolderSecurity, Hashtag, Widget2 } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@workspace/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@workspace/ui/components/input-group";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group"


export function TitleMenuDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:min-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Create channel
                    </DialogTitle>
                    <DialogDescription>
                        Create a channel and add meetings to it
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-5">
                    <InputGroup className="bg-input h-12">
                        <InputGroupInput autoFocus placeholder="eg. Weekly Sync" />
                        <InputGroupAddon>
                            <Hashtag />
                        </InputGroupAddon>
                    </InputGroup>
                    <div className="space-y-3">
                        <h4 className="text-sm text-muted-foreground font-semibold">
                            Visibility
                        </h4>
                        <RadioGroup defaultValue="workspace" className="space-y-2">
                            <FieldLabel htmlFor="workspace" className="group hover:bg-secondary rounded-md">
                                <Field orientation="horizontal" className="gap-4 ">
                                    <RadioGroupItem value="workspace" id="workspace" className="group-hover:data-[state=unchecked]:border-foreground" />
                                    <FieldContent>
                                        <FieldTitle className="text-sm font-semibold normal-case gap-1.5">
                                            <Widget2 />
                                            Workspace
                                        </FieldTitle>
                                        <FieldDescription className="text-sm text-muted-foreground normal-case">
                                            All workspace members can see and add meetings to this channel
                                        </FieldDescription>
                                    </FieldContent>

                                </Field>
                            </FieldLabel>
                            <FieldLabel htmlFor="personal" className="group hover:bg-secondary rounded-md">
                                <Field orientation="horizontal" className="gap-4">
                                    <RadioGroupItem value="personal" id="personal" className="group-hover:data-[state=unchecked]:border-foreground" />
                                    <FieldContent>
                                        <FieldTitle className="text-sm font-semibold normal-case gap-1.5">
                                            <FolderSecurity />
                                            Personal
                                        </FieldTitle>
                                        <FieldDescription className="text-sm text-muted-foreground normal-case">
                                            Only you can see and add meetings to this channel
                                        </FieldDescription>
                                    </FieldContent>

                                </Field>
                            </FieldLabel>
                        </RadioGroup>
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex items-center gap-3 justify-end">
                        <DialogClose asChild>
                            <Button variant="ghost">
                                Close
                            </Button>
                        </DialogClose>
                        <Button>
                            Create
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}