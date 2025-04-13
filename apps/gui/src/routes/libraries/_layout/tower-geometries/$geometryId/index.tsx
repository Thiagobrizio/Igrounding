import NiceModal from "@ebay/nice-modal-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";
import { t } from "i18next";

import ConductorLocationDiagram from "~/features/conductorLocations/components/ConductorLocationDiagram";
import ConductorLocationTable from "~/features/conductorLocations/components/ConductorLocationTable";
import UpdateTowerGeometryForm from "~/features/towerGeometries/components/UpdateTowerGeometryForm";

export const Route = createFileRoute(
    "/libraries/_layout/tower-geometries/$geometryId/"
)({
    component: ViewTowerGeometryPage,
});

export default function ViewTowerGeometryPage() {
    const { geometryId } = Route.useParams();

    function showCreateModal() {
        NiceModal.show("create-conductor-location", {
            geometryId,
        });
    }
    return (
        <Tabs defaultValue="general">
            <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="conductors">Conductors</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
                <Card>
                    <CardHeader>
                        <CardTitle>{t("edit.title")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UpdateTowerGeometryForm geometryId={geometryId} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="conductors">
                <div className="flex gap-4 items-center">
                    <CardWrapper className="w-1/2">
                        <CardToolbar>
                            <Button onClick={showCreateModal}>Add</Button>
                        </CardToolbar>
                        <Card>
                            <CardHeader>
                                <CardTitle>Conductor List</CardTitle>
                                <CardDescription>
                                    {t("description")}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ConductorLocationTable
                                    geometryId={geometryId}
                                />
                            </CardContent>
                        </Card>
                    </CardWrapper>
                    <CardWrapper className="w-1/2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Conductor Plot</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ConductorLocationDiagram
                                    geometryId={geometryId}
                                />
                            </CardContent>
                        </Card>
                    </CardWrapper>
                </div>
            </TabsContent>
        </Tabs>
    );
}
