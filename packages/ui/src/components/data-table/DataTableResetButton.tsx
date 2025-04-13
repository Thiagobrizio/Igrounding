import { type Table } from "@tanstack/react-table";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "../button";

interface DataTableResetButtonProps<T> {
    table: Table<T>;
}

export function DataTableResetButton<T>({
    table,
}: DataTableResetButtonProps<T>) {
    return (
        <Button
            onClick={() => {
                table.resetPageIndex();
                table.resetPagination();
                // table.resetColumnVisibility();
                table.resetGlobalFilter();
                table.resetRowSelection();
                table.resetSorting();
                // table.resetColumnFilters();
                // table.reset();
            }}
            size="sm"
            variant="outline"
        >
            <SlidersHorizontal className="h-4 w-4" />
            Reset
        </Button>
    );
}
