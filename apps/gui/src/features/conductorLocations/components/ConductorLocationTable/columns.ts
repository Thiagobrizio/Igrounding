import { createColumnHelper } from "@tanstack/react-table";

import type { ConductorLocation } from "./type";

import RowActions from "./RowActions";

const columnHelper = createColumnHelper<ConductorLocation>();

export default [
    columnHelper.accessor("number", {
        header: "#",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("x", {
        header: "X",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("y", {
        header: "Y",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.display({
        id: "actions",
        header: "",
        meta: {
            align: "right",
        },
        cell: RowActions,
    }),
];
