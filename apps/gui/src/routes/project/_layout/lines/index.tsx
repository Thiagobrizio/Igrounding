import { Button } from "@repo/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardToolbar,
    CardWrapper,
} from "@repo/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@repo/ui/tooltip";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import TransmissionLinesTable from "~/features/transmissionLines/components/TransmissionLinesTable";

export const Route = createFileRoute("/project/_layout/lines/")({
    component: ProjectSources,
});

export default function ProjectSources() {
    const { t } = useTranslation("projectLines");

    return (
        <CardWrapper>
            <CardToolbar>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild>
                                <Link to="/project/lines/new">
                                    {t("add.buttonText")}
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{t("add.buttonTooltip")}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardToolbar>
            <Card>
                <CardHeader>
                    <CardTitle>Transmission Lines</CardTitle>
                </CardHeader>
                <CardContent>
                    <TransmissionLinesTable />
                </CardContent>
            </Card>
        </CardWrapper>
    );
}
