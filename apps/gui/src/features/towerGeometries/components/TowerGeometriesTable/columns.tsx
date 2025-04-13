import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { t } from "i18next";

import type { TowerGeometry } from "./RowType";

import RowActions from "./RowActions";

const columnHelper = createColumnHelper<TowerGeometry>();

export default [
    columnHelper.accessor("name", {
        header: () => t("name.label", { ns: "towerGeometry" }),
        cell: (info) => {
            return (
                <Link
                    draggable={false}
                    params={{
                        geometryId: info.row.original.id,
                    }}
                    to="/libraries/tower-geometries/$geometryId"
                >
                    {info.getValue()}
                </Link>
            );
        },
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
