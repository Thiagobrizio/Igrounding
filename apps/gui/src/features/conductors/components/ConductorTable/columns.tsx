import { Checkbox } from "@repo/ui/checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { Square, SquareCheckBig } from "lucide-react";

import type { Conductor } from "./RowType";

import RowActions from "./RowActions";

const columnHelper = createColumnHelper<Conductor>();

export default [
    columnHelper.accessor("number", {
        header: () => "#",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <div className="px-1">
                <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    // indeterminate={table.getIsSomeRowsSelected()}
                    onCheckedChange={() => table.toggleAllRowsSelected()} //or getToggleAllPageRowsSelectedHandler
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="px-1">
                <Checkbox
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onCheckedChange={row.getToggleSelectedHandler()}
                />
            </div>
        ),
    }),
    columnHelper.accessor("name", {
        header: () => "Name",
        cell: (info) => info.renderValue(),
    }),

    columnHelper.accessor("fromPhase", {
        header: () => "From Phase",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("toPhase", {
        header: () => "To Phase",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("bundleNumber", {
        header: "Bundle Number",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("bundleSpacing", {
        header: "Bundle Spacing",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("isNeutral", {
        header: "Is Neutral?",
        cell: (info) => {
            return info.renderValue() ? (
                <SquareCheckBig aria-label="Yes" />
            ) : (
                <Square aria-label="No" />
            );
        },
    }),
    columnHelper.accessor("type.name", {
        header: "Conductor Type",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.display({
        id: "id",
        header: "",
        meta: {
            align: "right",
        },
        cell: RowActions,
    }),
];
