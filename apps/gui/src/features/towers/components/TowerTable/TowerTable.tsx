import { DataTable } from "@repo/ui/data-table/DataTable";
import { DataTableFooter } from "@repo/ui/data-table/DataTableFooter";
import useTable from "@repo/ui/hooks/use-table";
import { useTranslation } from "react-i18next";

import trpc from "~/utils/trpc";

import columns from "./columns";

interface TowerTableProps {
    lineId: string;
}

export default function TowerTable({ lineId }: TowerTableProps) {
    const { t } = useTranslation("towerTable");
    const utils = trpc.useUtils();
    const { data, isError, isLoading } = trpc.tower.getAllByLineId.useQuery({
        lineId: lineId,
    });
    const deleteManyMutation = trpc.tower.deleteMany.useMutation({
        onSuccess: () => {
            utils.tower.getAllByLineId.invalidate({ lineId });
        },
    });
    const table = useTable({
        data: data ?? [],
        columns,
        enableRowSelection: true,
        getRowId: (row) => row.id,
    });

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (isError || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }
    return (
        <>
            <DataTable table={table} />
            <DataTableFooter
                onDeleteMany={(ids) => deleteManyMutation.mutate(ids)}
                table={table}
            />
        </>
    );
}
