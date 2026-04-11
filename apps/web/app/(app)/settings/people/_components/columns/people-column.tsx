"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, MoreHorizontal, } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@workspace/ui/components/dropdown-menu";
import { WorkspaceMember } from "@workspace/types/people";
import { AltArrowDown } from "@solar-icons/react";
import { formatDateOnly } from "@workspace/ui/lib/date-format";

/* ---------------------------------- */
/* Helpers */
/* ---------------------------------- */

function formatRole(role: string) {
    return role.charAt(0).toUpperCase() + role.slice(1);
}


/* ---------------------------------- */
/* Columns */
/* ---------------------------------- */

export const peopleColumns: ColumnDef<WorkspaceMember>[] = [
    {
        accessorKey: "name",

        header: ({ column }) => (
            <Button
                variant="ghost"
                className="hover:bg-transparent px-0 pr-2"
                onClick={() =>
                    column.toggleSorting(
                        column.getIsSorted() === "asc"
                    )
                }
            >
                Name
                <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),

        cell: ({ row }) => {
            const member = row.original;

            return (
                <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                        <AvatarFallback>
                            {member.avatarInitials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold">{member.name} {member.isCurrentUser && " (you)"}</span>
                        <span className="text-xs font-medium text-muted-foreground">

                        </span>

                        <span className="text-muted-foreground text-sm">
                            {member.email}
                        </span>
                    </div>
                </div>
            );
        },
    },

    {
        accessorKey: "role",

        header: ({ column }) => (
            <Button
                variant="ghost"
                className="hover:bg-transparent px-3.5"
                onClick={() =>
                    column.toggleSorting(
                        column.getIsSorted() === "asc"
                    )
                }
            >
                Role
                <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),

        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="ghost">
                        {formatRole(row.original.role)}
                        <AltArrowDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-fit">
                    <DropdownMenuItem className="text-sm font-medium px-4 py-3">
                        Owner
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm font-medium px-4 py-3">
                        Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm font-medium px-4 py-3">
                        Member
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-sm font-medium px-4 py-3">
                        Guest
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },

    {
        accessorKey: "joinedAt",

        header: ({ column }) => (
            <Button
                variant="ghost"
                className="hover:bg-transparent px-0 pr-2"
                onClick={() =>
                    column.toggleSorting(
                        column.getIsSorted() === "asc"
                    )
                }
            >
                Joined Date
                <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),

        cell: ({ row }) =>
            formatDateOnly(row.original.joinedAt),
    },

    {
        id: "actions",

        enableSorting: false,

        cell: ({ row }) => {
            const member = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="w-full flex items-center justify-end">
                            <Button
                                variant="ghost"
                                size="icon"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-fit">
                        {member.isCurrentUser && (
                            <DropdownMenuItem className="text-sm font-medium px-4 py-3 text-destructive">
                                Leave workspace
                            </DropdownMenuItem>
                        )}
                        {!member.isCurrentUser && (
                            <DropdownMenuItem className="text-sm font-medium px-4 py-3 text-destructive">
                                Remove Member
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];