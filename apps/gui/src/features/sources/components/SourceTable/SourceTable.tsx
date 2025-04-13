import { DataTable } from "@repo/ui/data-table/DataTable";
import useTable from "@repo/ui/hooks/use-table";
import { useTranslation } from "react-i18next";

import trpc from "~/utils/trpc";

import columns from "./columns";

// interface SourceTableProps {}

export default function SourceTable() {
    const { t } = useTranslation("sourceTable");
    const { data = [], isError, isLoading } = trpc.source.getAll.useQuery({});
    const table = useTable({
        data: data,
        columns,
    });
    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (isError || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return <DataTable table={table} />;
}
