import { Copy, Download, Hashtag, MenuDots, Share, SquareTopDown, Text, TrashBin2 } from "@solar-icons/react/ssr";
import { Button } from "@workspace/ui/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";

export function MeetingItemMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="opacity-0 group-hover/meeting:opacity-100 data-[state=open]:opacity-100 duration-200 transition-all">
                    <MenuDots weight="Bold" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="sm:min-w-fit p-2 text-sm space-y-3">
                <DropdownMenuGroup className="space-y-3">
                    <DropdownMenuItem>
                        <SquareTopDown />
                        Open in a new tab
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Share />
                        Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Copy />
                        Copy link
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
    )
}