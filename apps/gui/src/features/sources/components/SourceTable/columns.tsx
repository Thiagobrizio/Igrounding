import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";

import type { Source } from "./RowType";

import SourceTableRowActions from "./RowActions";

const columnHelper = createColumnHelper<Source>();

export default [
    columnHelper.accessor("name", {
        header: () => t("name.label", { ns: "sourceTable" }),
        cell: (info) => {
            return (
                <Link
                    params={{
                        sourceId: info.row.original.id,
                    }}
                    to="/project/sources/$sourceId"
                >
                    {info.getValue()}
                </Link>
            );
        },
    }),
    columnHelper.accessor("x1r1", {
        header: () => "X1/R1",
    }),
    columnHelper.accessor("x0r0", {
        header: () => "X0/R0",
    }),
    columnHelper.accessor("resistance", {
        header: "Resistance",
    }),
    columnHelper.accessor("frequency", {
        header: "Frequency",
    }),
    columnHelper.accessor("isc1", {
        header: "Short Circuit 1-Phase Current",
    }),
    columnHelper.accessor("isc3", {
        header: "Short Circuit 3-Phase Current",
    }),
    columnHelper.display({
        id: "id",
        header: "",
        meta: {
            align: "right",
        },
        cell: SourceTableRowActions,
    }),
];
