"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown, MoreHorizontal, } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@workspace/ui/components/dropdown-menu";
import { WorkspaceMemberInvitation } from "@workspace/types";
import { formatDateOnly } from "@/lib/date-format";
import { Checkbox } from "@workspace/ui/components/checkbox";


export const peopleInvitationColumns: ColumnDef<WorkspaceMemberInvitation>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
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
                        <span className="text-sm font-medium">{member.name}</span>
                        <span className="text-muted-foreground text-xs">
                            {member.email}
                        </span>
                    </div>
                </div>
            );
        },
    },

    {
        accessorKey: "role",

        header: '',
        cell: ''
    },

    {
        accessorKey: "invitedAt",

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
                Invited Date
                <ChevronsUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),

        cell: ({ row }) =>
            <span className="text-sm text-muted-foreground">{formatDateOnly(row.original.invitedAt)}</span>,
    },

    {
        id: "actions",

        enableSorting: false,
        enableHiding: false,

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
                        <DropdownMenuItem className="text-sm font-medium px-4 py-3 text-destructive">
                            Revoke Invitation
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];