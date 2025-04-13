import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import CreateTowerGeometryForm from "~/features/towerGeometries/components/CreateTowerGeometryForm";

export const Route = createFileRoute("/libraries/_layout/tower-geometries/new")(
    {
        component: CreateTowerGeometryPage,
    }
);

export default function CreateTowerGeometryPage() {
    const { t } = useTranslation("towerGeometry");

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t("add.title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <CreateTowerGeometryForm />
            </CardContent>
        </Card>
    );
}
