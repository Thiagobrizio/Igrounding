import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import UpdateConductorTypeForm from "~/features/conductorTypes/components/UpdateConductorTypeForm";

export const Route = createFileRoute(
    "/libraries/_layout/conductor-types/$typeId/"
)({
    component: UpdateConductorTypePage,
});

export default function UpdateConductorTypePage() {
    const { t } = useTranslation("updateConductorTypePage");
    const { typeId } = Route.useParams();
    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("edit.title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <UpdateConductorTypeForm conductorTypeId={typeId} />
            </CardContent>
        </Card>
    );
}
