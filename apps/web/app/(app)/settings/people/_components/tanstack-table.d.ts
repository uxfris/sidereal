import "@tanstack/react-table"

declare module "@tanstack/react-table" {
    interface TableMeta<TData> {
        updateRole?: (id: string, role: string) => void
        updateMultipleRoles?: (role: string) => void
    }
}