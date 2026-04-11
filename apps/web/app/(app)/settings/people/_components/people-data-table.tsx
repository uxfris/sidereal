"use client"

import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { Button } from "@workspace/ui/components/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { useState } from "react"
import { usePeopleTableStore } from "../_stores/people-table-store"
import React from "react"
import { PeopleSearchFilterAction } from "./search-filter-actions/people-filter-search-action"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function PeopleDataTable<TData, TValue>({ columns, data }: DataTableProps<TValue, TData>) {

    const { sorting, search, setSorting } = usePeopleTableStore()

    const columnFilters = React.useMemo(
        () =>
            search
                ? [
                    {
                        id: "name",
                        value: search,
                    },

                ]
                : [],
        [search]
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // onColumnFiltersChange: setColumnFilters,
    })

    return (
        <div className="space-y-2">
            <PeopleSearchFilterAction />
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
                            {table.getRowModel().rows?.length ?
                                (
                                    table.getRowModel().rows.map((row) => (
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
                                    ))
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
                <div className="flex items-center gap-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>

    )
}