import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

import BaseSelect, { type BaseSelectProps } from "~/components/BaseSelect";
import trpc from "~/utils/trpc";

const TowerGeometrySelect = forwardRef<
    HTMLButtonElement,
    Omit<BaseSelectProps, "data">
>((props, ref) => {
    const { t } = useTranslation("towerGeometrySelect");
    const { data, isError, isLoading } = trpc.towerGeometry.getAll.useQuery();

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (isError || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return <BaseSelect data={data} ref={ref} {...props} />;
});

TowerGeometrySelect.displayName = "TowerGeometrySelect";

export default TowerGeometrySelect;
