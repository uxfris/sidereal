"use client"

import { CreateChannelDialog } from "@/app/(app)/dashboard/(meetings)/meetings/_components/create-channel-dialog";
import { MoveMeeting } from "@/app/(app)/dashboard/_components/meetings/meeting-menu-item/move-meeting-dialog";
import { RenameMeeting } from "@/app/(app)/dashboard/_components/meetings/meeting-menu-item/rename-meeting-dialog";
import { ShareMeetingDialog } from "@/app/(app)/dashboard/_components/meetings/meeting-menu-item/share-meeting-dialog";
import { CopyButton } from "@/components/copy-button";
import { CreditLeftCard } from "@/components/credit-left-card";
import { Hashtag } from "@solar-icons/react";
import { AltArrowDown, AltArrowLeft, InfoCircle, Pen, Share, Star } from "@solar-icons/react/ssr";
import { Meeting } from "@workspace/types/meetings";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import Link from "next/link";
import { useState } from "react";

export function MeetingDocumentToolbar({ meeting }: { meeting: Meeting }) {

    const [openShare, setOpenShare] = useState(false)
    const [openMove, setOpenMove] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const [openRename, setOpenRename] = useState(false)

    const createChannel = () => {
        setOpenMove(false)
        setOpenCreate(true)
    }

    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <>
            <div className="fixed top-0 inset-x-0 z-50 bg-card w-full">
                <div className="flex items-center justify-between pt-1 px-5">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer py-2">
                            <span className="text-sm font-medium">Q4 Strategy Planning</span>
                            <AltArrowDown />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="sm:min-w-56 space-y-2">
                            <Link href="/dashboard">
                                <DropdownMenuItem>
                                    <AltArrowLeft />
                                    Go to Dashboard
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <div className="flex items-center gap-2 p-1">
                                <span className="flex items-center justify-center rounded-sm bg-primary text-primary-foreground! w-6 h-6 text-center text-xs font-medium" aria-hidden="true">F</span>
                                <span className="text-xs">Fris's Lume</span>
                                <Badge variant="secondary">Free</Badge>
                            </div>
                            <CreditLeftCard />
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup className="text-sm font-medium text-popover-foreground space-y-1">
                                <DropdownMenuItem onSelect={() => setOpenShare(true)}>
                                    <Share />
                                    Share
                                </DropdownMenuItem>
                                {/* <DropdownMenuItem>
                                    <Restart />
                                    Regenerate Notes
                                </DropdownMenuItem> */}
                                <DropdownMenuItem>
                                    <Star />
                                    Star Meeting
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setOpenRename(true)}>
                                    <Pen />
                                    Rename
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setOpenMove(true)}>
                                    <Hashtag />
                                    Move to channel
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <InfoCircle />
                                    Details
                                </DropdownMenuItem>
                                {/* <DropdownMenuItem>
                                    <Download />
                                    Download
                                </DropdownMenuItem> */}
                            </DropdownMenuGroup>

                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground-2 font-medium px-1">Edited Mar 30</span>
                        <Button variant="ghost" size="sm" onClick={() => setOpenShare(true)}>
                            Share
                        </Button>
                        <CopyButton content="" />
                        <Button variant="ghost" size="icon-sm">
                            <Star />
                        </Button>
                    </div>
                </div>
            </div>
            <ShareMeetingDialog open={openShare} onOpenChange={setOpenShare} meeting={meeting} />
            <RenameMeeting open={openRename} onOpenChange={setOpenRename} meeting={meeting} />
            <MoveMeeting open={openMove} onOpenChange={setOpenMove} meeting={meeting} onCreateChannel={createChannel} />
            <CreateChannelDialog open={openCreate} onOpenChange={setOpenCreate} />
        </>
    )
}