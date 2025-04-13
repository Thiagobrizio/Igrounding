import React from "react";
import { useTranslation } from "react-i18next";

import BaseSelect, { type BaseSelectProps } from "~/components/BaseSelect";
import trpc from "~/utils/trpc";

const ConductorTypeSelect = React.forwardRef<
    HTMLButtonElement,
    Omit<BaseSelectProps, "data">
>(({ ...props }, ref) => {
    const { data, isError, isLoading } = trpc.conductorType.getAll.useQuery();
    const { t } = useTranslation("conductorTypeSelect");

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }

    if (isError || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }

    return <BaseSelect {...props} data={data} ref={ref} />;
});

ConductorTypeSelect.displayName = "ConductorTypeSelect";

export default ConductorTypeSelect;
