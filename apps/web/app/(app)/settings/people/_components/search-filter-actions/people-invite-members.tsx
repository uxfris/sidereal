"use client"

import { UserPlus } from "@solar-icons/react";
import { Button } from "@workspace/ui/components/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import { Field, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PeopleInviteMembers() {

    const [open, setOpen] = useState(false)

    //Get context data to show the dialog from a query param: isInvite
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()


    useEffect(() => {
        if (searchParams.get('invite') === 'true') {
            setOpen(true)

            // Clean up the URL immediately so it doesn't reopen on refresh
            const params = new URLSearchParams(searchParams.toString())
            params.delete('invite')
            router.replace(pathname + (params.toString() ? `?${params.toString()}` : ''), { scroll: false })
        }




    }, [searchParams, pathname, router])

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger asChild>
                <Button size="xs">
                    <UserPlus />
                    Invite members
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Invite members
                    </DialogTitle>
                    <DialogDescription>
                        Invite members to your workspace by email
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input placeholder="example1@example.com, example2@example.com" />
                    </Field>
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
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button>Invite</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}