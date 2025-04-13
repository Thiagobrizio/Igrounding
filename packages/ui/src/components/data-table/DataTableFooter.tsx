import { type Table } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { Button } from "../button";
// import DataTablePagination from "./DataTablePagination";

interface DataTableFooterProps<T> {
    table: Table<T>;
    onDeleteMany: (ids: string[]) => void;
}

export function DataTableFooter<T>({
    table,
    onDeleteMany,
}: DataTableFooterProps<T>) {
    const rowSelection = table.getState().rowSelection;
    const totalSelected = Object.keys(rowSelection).length;
    const totalRows = table.getRowCount();
    return (
        <div className="align-center flex justify-between py-4">
            <div className="flex items-center gap-2">
                {totalSelected} of {totalRows} Total Rows Selected
                {totalSelected > 0 && (
                    <>
                        <Button
                            className="size-8"
                            onClick={() => {
                                onDeleteMany(Object.keys(rowSelection));
                                table.resetRowSelection();
                            }}
                            size="icon"
                            variant="destructive"
                        >
                            <Trash2 className="size-4" />
                        </Button>
                        <Button
                            onClick={() => {
                                table.resetRowSelection();
                            }}
                            size="sm"
                            variant="outline"
                        >
                            Clear Selection
                        </Button>
                    </>
                )}
            </div>
            {/* <DataTablePagination table={table} /> */}
        </div>
    );
}
