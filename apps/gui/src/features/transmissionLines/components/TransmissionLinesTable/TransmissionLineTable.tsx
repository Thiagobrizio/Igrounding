import { DataTable } from "@repo/ui/data-table/DataTable";
import useTable from "@repo/ui/hooks/use-table";
import { useTranslation } from "react-i18next";

import trpc from "~/utils/trpc";

import columns from "./columns";

// interface TransmissionLineTableProps {}

export default function TransmissionLineTable() {
    const { t } = useTranslation("transmissionLineTable");
    const {
        data = [],
        isError,
        isLoading,
    } = trpc.transmissionLine.getAll.useQuery({});

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
