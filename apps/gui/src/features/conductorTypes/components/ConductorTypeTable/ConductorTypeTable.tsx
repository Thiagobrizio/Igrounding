import { DataTable } from "@repo/ui/data-table/DataTable";
import useTable from "@repo/ui/hooks/use-table";
import { useTranslation } from "react-i18next";

import trpc from "~/utils/trpc";

import columns from "./columns";

export default function ConductorTypeTable() {
    const { t } = useTranslation("conductorTypeTable");
    const {
        data = [],
        isLoading,
        isError,
    } = trpc.conductorType.getAll.useQuery();

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

    return (
        <div className="flex flex-col gap-4">
            <DataTable table={table} />
        </div>
    );
}
