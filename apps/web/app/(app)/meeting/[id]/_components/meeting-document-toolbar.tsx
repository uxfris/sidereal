import { CreditLeftCard } from "@/components/credit-left-card";
import { AltArrowDown, AltArrowLeft, Copy, Download, InfoCircle, Pen, Restart, Share, Star } from "@solar-icons/react/ssr";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import Link from "next/link";

export function MeetingDocumentToolbar() {
    return (
        <div className="fixed top-0 inset-x-0 z-50 bg-background w-full">
            <div className="flex items-center justify-between pt-1 px-5">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer py-2">
                        <span className="text-sm font-medium">Q4 Strategy Planning</span>
                        <AltArrowDown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="sm:min-w-3xs space-y-2">
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
                        <DropdownMenuGroup className="text-sm space-y-1">
                            <DropdownMenuItem>
                                <Share />
                                Share
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Restart />
                                Regenerate Notes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Pen />
                                Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <InfoCircle />
                                Meeting Info
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Download />
                                Download
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground-2 font-medium px-1">Edited Mar 30</span>
                    <Button variant="ghost" size="sm">
                        Share
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                        <Copy />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                        <Star />
                    </Button>
                </div>
            </div>
        </div>
    )
}