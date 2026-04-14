"use client"

import { ClockCircle, Link, Refresh, TrashBin2 } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import { Field, FieldLabel } from "@workspace/ui/components/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Copy } from "lucide-react";
import { useState } from "react";

export function PeopleLinkInvite() {

    const [isSuccess, setIsSuccess] = useState(false)


    const createLink = () => {
        setIsSuccess(true)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex-1"
                    size="xs" variant="secondary">
                    <Link />
                    Invite link
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Workspace invite link
                    </DialogTitle>
                    <DialogDescription>
                        Generate a link to invite people to this workspace.
                        Link expire after 5 days.
                    </DialogDescription>
                </DialogHeader>
                <form>
                    <Field>
                        <FieldLabel>Role</FieldLabel>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="choose role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="member">Member</SelectItem>
                                    <SelectItem value="guest">Guest</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                </form>
                {isSuccess && <>
                    <div>
                        <div className="space-y-2">
                            <p className="text-sm text-foreground font-semibold">
                                Invite link
                            </p>
                            <Button className="w-full">
                                <Copy />
                                Copy
                            </Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground-2">
                                <ClockCircle />
                                Expires Apr 16, 4:51 AM
                            </div>
                            <Button variant="ghost" className="p-0 bg-transparent hover:bg-transparent">
                                <Refresh />
                                Regenerate
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" className="text-destructive hover:text-destructive">
                            <TrashBin2 />
                            Delete
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>

                        </DialogClose>

                    </div>
                </>}

                {!isSuccess && <DialogFooter>
                    <Button onClick={createLink}>Create invite link</Button>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                </DialogFooter>}
            </DialogContent>
        </Dialog >
    )
}