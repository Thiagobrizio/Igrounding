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

import ConductorTypeTable from "~/features/conductorTypes/components/ConductorTypeTable";

export const Route = createFileRoute("/libraries/_layout/conductor-types/")({
    component: AllConductorTypesPage,
});

export default function AllConductorTypesPage() {
    const { t } = useTranslation("conductorTypesPage");

    return (
        <CardWrapper>
            <CardToolbar>
                <Button asChild>
                    <Link to="/libraries/conductor-types/new">
                        {t("add.buttonText")}
                    </Link>
                </Button>
            </CardToolbar>
            <Card>
                <CardHeader>
                    <CardTitle>Conductor Types</CardTitle>
                    <CardDescription>
                        Conductor types in the database
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ConductorTypeTable />
                </CardContent>
            </Card>
        </CardWrapper>
    );
}
