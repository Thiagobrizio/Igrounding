import { Checkbox } from "@repo/ui/checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";

import type { TransmissionTower } from "./RowType";

import RowActions from "./RowActions";

const columnHelper = createColumnHelper<TransmissionTower>();

export default [
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
        header: () => t("name.label", { ns: "conductorConfiguration" }),
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("resistance", {
        header: () => "Resistance",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("distance", {
        header: () => "Distance",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("geometry.name", {
        header: "Geometry",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("id", {
        header: "",
        meta: {
            align: "right",
        },
        cell: RowActions,
    }),
];
