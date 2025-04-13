import { type Table } from "@tanstack/react-table";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "../button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../dropdown-menu";

interface DataTableViewOptionsProps<T> {
    table: Table<T>;
}

export default function DataTableViewOptions<T>({
    table,
}: DataTableViewOptionsProps<T>) {
    const visibleColumns = table
        .getAllColumns()
        .filter((column) => column.getCanHide());
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                    <SlidersHorizontal className="h-4 w-4" />
                    View
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {visibleColumns.map((column) => {
                    return (
                        <DropdownMenuCheckboxItem
                            checked={column.getIsVisible()}
                            key={column.id}
                            onCheckedChange={(value) => {
                                column.toggleVisibility(!!value);
                            }}
                        >
                            {column.columnDef.meta?.name}
                        </DropdownMenuCheckboxItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
