import { Button } from "@repo/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardToolbar,
    CardWrapper,
} from "@repo/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import TowerGeometriesTable from "~/features/towerGeometries/components/TowerGeometriesTable";

export const Route = createFileRoute("/libraries/_layout/tower-geometries/")({
    component: AllTowerGeometriesPage,
});

export default function AllTowerGeometriesPage() {
    const { t } = useTranslation("towerGeometriesPage");

    return (
        <CardWrapper>
            <CardToolbar>
                <Button asChild>
                    <Link to="/libraries/tower-geometries/new">
                        {t("add.buttonText")}
                    </Link>
                </Button>
            </CardToolbar>
            <Card>
                <CardHeader>
                    <CardTitle>Tower Geometries</CardTitle>
                    <CardDescription>
                        Tower Geometries in the database
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TowerGeometriesTable />
                </CardContent>
            </Card>
        </CardWrapper>
    );
}
