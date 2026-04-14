"use client"

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table"
import { Button } from "@workspace/ui/components/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { useEffect, useState } from "react"
import { PeopleSearchFilterAction } from "./search-filter-actions/people-filter-search-action"
import { formatDateOnly } from "@workspace/ui/lib/date-format"
import { PeopleBulkActionBar } from "./search-filter-actions/people-bulk-action-bar"
import { WorkspaceMember, WorkspaceMemberInvitation } from "@workspace/types/people"
import { cn } from "@workspace/ui/lib/utils"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function PeopleDataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {

    const [tableData, setTableData] = useState(data)

    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState("")
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [selectionMode, setSelectionMode] = useState(false)
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        select: false,
    })

    const updateMemberRole = (memberId: string, newRole: string) => {
        setTableData((prev) =>
            prev.map((member) =>
                (member as WorkspaceMember).id === memberId
                    ? { ...member, role: newRole }
                    : member
            )
        )
    }

    const updateMultipleRoles = (role: string) => {
        const selectedRows = table.getFilteredSelectedRowModel().rows

        setTableData((prev) =>
            prev.map((member) =>
                selectedRows.some((row) => (row.original as WorkspaceMember).id === (member as WorkspaceMember).id)
                    ? { ...member, role }
                    : member
            )
        )
    }

    const table = useReactTable({
        data: tableData,
        columns,
        state: {
            sorting,
            globalFilter,
            columnFilters,
            rowSelection,
            columnVisibility
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 8
            }
        },
        enableRowSelection: (row) => {
            const member = row.original as WorkspaceMember
            return !member.isCurrentUser
        },
        meta: {
            updateRole: updateMemberRole,
            updateMultipleRoles: updateMultipleRoles
        },
        globalFilterFn: (row, _columnId, filterValue) => {
            const search = String(filterValue).toLowerCase()
            const { name, email, role, joinedAt, invitedAt } = row.original as {
                name: string
                email: string
                role: string
                joinedAt: string
                invitedAt: string
            }
            const joinedAtformattedDate = formatDateOnly(joinedAt).toLowerCase()
            const invitedAtFormattedDate = formatDateOnly(invitedAt).toLowerCase()

            return (
                name.toLowerCase().includes(search) ||
                email.toLowerCase().includes(search) ||
                role.toLowerCase().includes(search) ||
                joinedAtformattedDate.includes(search) ||
                invitedAtFormattedDate.includes(search)
            )
        }
    })

    useEffect(() => {
        setColumnVisibility((prev) => ({
            ...prev,
            select: selectionMode,
        }))
    }, [selectionMode])

    useEffect(() => {
        if (!selectionMode) {
            setRowSelection({})
        }
    }, [selectionMode])




    const pagination = table.getState().pagination
    const pageIndex = pagination.pageIndex
    const pageSize = pagination.pageSize

    const totalRows = table.getFilteredRowModel().rows.length

    const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1
    const end = Math.min((pageIndex + 1) * pageSize, totalRows)

    const rows = table.getRowModel().rows
    const emptyRows = pageSize - rows.length

    return (
        <div className="space-y-2">
            <PeopleSearchFilterAction
                searchValue={globalFilter}
                onSearchChange={setGlobalFilter}
                filterValue={(table.getColumn("role")?.getFilterValue() as string) ?? ""}
                onFilterChange={(value) => table.getColumn("role")?.setFilterValue(value === "all" ? undefined : value)}
                selectionMode={selectionMode}
                onSelectionModeChange={setSelectionMode}

            />
            <div>
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader className="bg-secondary h-12">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null :
                                                flexRender(header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}

                        </TableHeader>
                        <TableBody>
                            {rows.length ?
                                (
                                    <>
                                        {rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        )
                                        )}
                                        {
                                            Array.from({ length: emptyRows }).map((_, i) => (
                                                <TableRow key={`empty-${i}`} className="border-0 hover:bg-transparent">
                                                    <TableCell colSpan={columns.length} className="h-12" />
                                                </TableRow>
                                            ))
                                        }
                                    </>
                                )
                                :
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No result
                                    </TableCell>
                                </TableRow>}
                        </TableBody>
                    </Table>
                </div>
                <div className={cn("flex items-center justify-between", totalRows < 8 && "hidden")}>
                    <p className="text-xs text-muted-foreground">
                        {totalRows === 0
                            ? "No results"
                            : `Showing ${start}-${end} of ${totalRows}`}
                    </p>
                    <div className="flex items-center gap-2 py-4">
                        {table.getCanPreviousPage() && <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>}
                        {table.getCanNextPage() && <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>}
                    </div>
                </div>
            </div>
            {selectionMode && <PeopleBulkActionBar table={table} setSelectionMode={setSelectionMode} />}
        </div>

    )
}