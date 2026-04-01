import { Home, Inbox, Monitor, PaintRoller, Settings, Sun, User } from "@solar-icons/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@workspace/ui/components/dropdown-menu";
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "@workspace/ui/components/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar";
import Image from "next/image";
import { Logout, Moon } from "@solar-icons/react/ssr";
import { cn } from "@workspace/ui/lib/utils";

export function NavUser() {
    const { state } = useSidebar()
    return (
        <SidebarMenuItem className={cn("items-center justify-between flex", state === "collapsed" && "flex-col")}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-auto items-center justify-center">
                        <Avatar className="w-5 h-5">
                            <AvatarImage
                                src={"https://assets.lummi.ai/assets/Qmeh9r8a3AE8dQyCTSLiqVKLgu6HKEvJWaEwxMUMyDqHn5?auto=format&w=150"}
                                alt="FE" />
                            <AvatarFallback>FE</AvatarFallback>
                        </Avatar>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                    side={"top"}
                    align="start"
                    sideOffset={4}>
                    <DropdownMenuLabel className="py-2 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={"https://assets.lummi.ai/assets/Qmeh9r8a3AE8dQyCTSLiqVKLgu6HKEvJWaEwxMUMyDqHn5?auto=format&w=150"}
                                    alt="FE" />
                                <AvatarFallback className="rounded-lg">FE</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold text-foreground">{"Fris El"}</span>
                                <span className="truncate text-xs">fris.el@example.com</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup className="text-sm text-foreground font-medium">
                        <DropdownMenuItem className="py-2">
                            <User />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="py-2">
                            <Settings />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center w-full py-2">
                                <PaintRoller />
                                Appearance
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                                        <DropdownMenuRadioGroup
                                            value={"light"}
                                            onValueChange={(value) => { }}
                                        >
                                            <DropdownMenuRadioItem value="light">
                                                <Sun />
                                                Light
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="dark">
                                                <Moon />
                                                Dark
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="system">
                                                <Monitor />
                                                System
                                            </DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuGroup>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem className="py-2">
                            <Home />
                            Homepage
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="py-2 text-sm text-foreground font-medium">
                        <Logout />
                        Sign out
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
            <SidebarMenuButton className="w-auto" >
                <div className="relative">
                    <Inbox size={16} />
                    <div className="w-1.5 h-1.5 bg-[#FF5252] absolute top-0 right-0 rounded-full" />
                </div>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}
