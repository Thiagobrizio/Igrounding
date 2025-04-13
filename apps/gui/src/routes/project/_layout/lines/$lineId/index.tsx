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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@repo/ui/tooltip";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import ConductorTable from "~/features/conductors/components/ConductorTable";
import TowerTable from "~/features/towers/components/TowerTable";
import UpdateTransmissionLineForm from "~/features/transmissionLines/components/UpdateTransmissionLineForm";

export const Route = createFileRoute("/project/_layout/lines/$lineId/")({
    component: ProjectLinesPage,
});

export default function ProjectLinesPage() {
    const { lineId } = Route.useParams();
    const { t } = useTranslation("ProjectLinesPage");
    function showCreateConductorModal() {
        NiceModal.show("create-conductor", {
            lineId,
        });
    }

    function showGenerateConductorsModal() {
        NiceModal.show("generate-conductors", { lineId });
    }

    function showCreateTowerModal() {
        NiceModal.show("create-tower", {
            lineId,
        });
    }

    function showGenerateTowersModal() {
        NiceModal.show("generate-towers", {
            lineId,
        });
    }
    return (
        <Tabs defaultValue="general">
            <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="conductors">Conductors</TabsTrigger>
                <TabsTrigger value="towers">Towers</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
                <Card>
                    <CardHeader>
                        <CardTitle>General</CardTitle>
                        <CardDescription>
                            General information about the transmission line.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UpdateTransmissionLineForm lineId={lineId} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="conductors">
                <CardWrapper>
                    <CardToolbar>
                        <Button onClick={showCreateConductorModal}>Add</Button>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={showGenerateConductorsModal}
                                    >
                                        {t("form:generate")}
                                    </Button>
                                </TooltipTrigger>

                                <TooltipContent>
                                    <p>{t("tooltip")}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardToolbar>
                    <Card>
                        <CardHeader>
                            <CardTitle>Conductors</CardTitle>
                            <CardDescription>
                                {t("description")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ConductorTable lineId={lineId} />
                        </CardContent>
                    </Card>
                </CardWrapper>
            </TabsContent>
            <TabsContent value="towers">
                <CardWrapper>
                    <CardToolbar>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button onClick={showCreateTowerModal}>
                                        Add
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Add a Tower to the Line</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button onClick={showGenerateTowersModal}>
                                        {t("form:generate")}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Generate tower configuration</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardToolbar>
                    <Card>
                        <CardHeader>
                            <CardTitle>Towers</CardTitle>
                            <CardDescription>
                                {t("description")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TowerTable lineId={lineId} />
                        </CardContent>
                    </Card>
                </CardWrapper>
            </TabsContent>
        </Tabs>
    );
}
