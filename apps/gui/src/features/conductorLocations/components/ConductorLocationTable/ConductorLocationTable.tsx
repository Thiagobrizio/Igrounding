import type { GeometryID } from "@repo/validators/Ids";

import { DataTable } from "@repo/ui/data-table/DataTable";
import useTable from "@repo/ui/hooks/use-table";
import { useTranslation } from "react-i18next";

import trpc from "~/utils/trpc";

import columns from "./columns";

interface ConductorLocationTableProps {
    geometryId: GeometryID;
}

export default function ConductorLocationTable({
    geometryId,
}: ConductorLocationTableProps) {
    const { t } = useTranslation("conductorLocationTable");
    const {
        data = [],
        isError,
        isLoading,
    } = trpc.conductorLocations.getAllByGeometryId.useQuery({ geometryId });

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
