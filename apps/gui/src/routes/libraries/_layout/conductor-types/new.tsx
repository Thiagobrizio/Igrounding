import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import CreateConductorTypeForm from "~/features/conductorTypes/components/CreateConductorTypeForm";

export const Route = createFileRoute("/libraries/_layout/conductor-types/new")({
    component: CreateConductorTypePage,
});

export default function CreateConductorTypePage() {
    const { t } = useTranslation("conductorType");
    const navigate = useNavigate();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("add.title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <CreateConductorTypeForm
                    onFinish={() =>
                        navigate({ to: "/libraries/conductor-types" })
                    }
                />
            </CardContent>
        </Card>
    );
}
