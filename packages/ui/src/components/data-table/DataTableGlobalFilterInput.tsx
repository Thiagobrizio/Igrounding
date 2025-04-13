import { RowData, type Table } from "@tanstack/react-table";

import { Input } from "../input";

interface DataTableGlobalFilterInputProps<TData extends RowData> {
    table: Table<TData>;
}

export default function DataTableGlobalFilterInput<TData extends RowData>({
    table,
}: DataTableGlobalFilterInputProps<TData>) {
    const value = table.getState().globalFilter as string;
    return (
        <Input
            className="max-w-sm"
            onChange={(e) => {
                table.setGlobalFilter(e.target.value);
            }}
            placeholder="Search..."
            value={value || ""}
        />
    );
}
