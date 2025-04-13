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

import SourceTable from "~/features/sources/components/SourceTable";

export const Route = createFileRoute("/project/_layout/sources/")({
    component: ProjectSources,
});

export default function ProjectSources() {
    const { t } = useTranslation("projectSources");

    return (
        <CardWrapper>
            <CardToolbar>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild>
                                <Link to="/project/sources/new">
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
                    <CardTitle>Sources</CardTitle>
                </CardHeader>
                <CardContent>
                    <SourceTable />
                </CardContent>
            </Card>
        </CardWrapper>
    );
}
