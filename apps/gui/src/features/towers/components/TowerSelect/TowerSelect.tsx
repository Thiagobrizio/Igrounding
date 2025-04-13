import { forwardRef } from "react";

import BaseSelect, { type BaseSelectProps } from "~/components/BaseSelect";
import trpc from "~/utils/trpc";

const TowerSelect = forwardRef<
    HTMLButtonElement,
    Omit<BaseSelectProps, "data">
>((props, ref) => {
    const { data, isLoading, isError } = trpc.tower.getAll.useQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !data) {
        return <div>Error!</div>;
    }

    return <BaseSelect data={data} ref={ref} {...props} />;
});

TowerSelect.displayName = "TowerSelect";

export default TowerSelect;
