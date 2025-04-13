import { DataTable } from "@repo/ui/data-table/DataTable";
import useTable from "@repo/ui/hooks/use-table";
import { useTranslation } from "react-i18next";

import trpc from "~/utils/trpc";

import columns from "./columns";

export default function GeometriesTable() {
    const { t } = useTranslation("geometriesTable");
    const {
        data = [],
        isError,
        isLoading,
    } = trpc.towerGeometry.getAll.useQuery();
    const table = useTable({
        data: data,
        columns,
    });
    if (isError) {
        return <div>{t("general:errorMessage")}</div>;
    }
    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }

    return <DataTable table={table} />;
}
