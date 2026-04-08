import { Download, Hashtag, MenuDots, Share, SquareTopDown, Text, TrashBin2 } from "@solar-icons/react/ssr";
import { Meeting } from "@workspace/types/meetings";
import { Button } from "@workspace/ui/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { ShareMeetingDialog } from "./share-meeting-dialog";

export function MeetingItemMenu({ meeting }: { meeting: Meeting }) {

    const [openShare, setOpenShare] = useState(false)

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="opacity-0 group-hover/meeting:opacity-100 data-[state=open]:opacity-100 duration-200 transition-all">
                        <MenuDots weight="Bold" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="sm:min-w-fit p-2 text-sm space-y-3">
                    <DropdownMenuGroup className="space-y-3">
                        <DropdownMenuItem asChild>
                            <Link href={`/meetings/${meeting.id}`} target="_blank" rel="noopener noreferrer">
                                <SquareTopDown />
                                Open in a new tab
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setOpenShare(true)}>
                            <Share />
                            Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Download />
                            Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Hashtag />
                            Move to channel
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Text />
                            Rename
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                        <TrashBin2 />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>

            </DropdownMenu>
            <ShareMeetingDialog open={openShare} onOpenChange={setOpenShare} meeting={meeting} />
        </div>
    )
}

