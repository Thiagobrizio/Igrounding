import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";

import type { TransmissionLine } from "./RowType";

import RowActions from "./RowActions";

const columnHelper = createColumnHelper<TransmissionLine>();

export default [
    columnHelper.accessor("name", {
        header: () => t("name.label", { ns: "conductorConfiguration" }),
        cell: (info) => {
            return (
                <Link
                    params={{
                        lineId: info.row.original.id,
                    }}
                    to="/project/lines/$lineId"
                >
                    {info.getValue()}
                </Link>
            );
        },
    }),
    columnHelper.accessor("fromSource.name", {
        header: () => "From",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("toSource.name", {
        header: () => "To",
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
