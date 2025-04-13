import useTable from "@repo/ui/hooks/use-table";
import { DataTable } from "@repo/ui/table/DataTable";
import { DataTableFooter } from "@repo/ui/table/DataTableFooter";
import { useTranslation } from "react-i18next";

import trpc from "~/utils/trpc";

import columns from "./columns";

interface ConductorTableProps {
    lineId: string;
}

export default function ConductorTable({ lineId }: ConductorTableProps) {
    const { t } = useTranslation("conductorTable");
    const utils = trpc.useUtils();
    const { data, error, isLoading } = trpc.conductor.getAll.useQuery({
        lineId,
    });
    const deleteManyMutation = trpc.conductor.deleteMany.useMutation({
        onSuccess: () => {
            utils.conductor.getAll.invalidate({ lineId });
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

    if (error || !data) {
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
