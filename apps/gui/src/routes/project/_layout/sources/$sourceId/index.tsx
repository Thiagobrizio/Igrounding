import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import SourceSequenceSection from "~/features/sources/components/SourceSequenceSection";
import UpdateSourceForm from "~/features/sources/components/UpdateSourceForm";

export const Route = createFileRoute("/project/_layout/sources/$sourceId/")({
    component: ViewSourcePage,
});

export default function ViewSourcePage() {
    const { sourceId } = Route.useParams();
    const { t } = useTranslation("viewSourcePage");
    return (
        <Tabs defaultValue="general">
            <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="sequence">Sequence</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
                <Card>
                    <CardHeader>
                        <CardTitle>{t("edit.title")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UpdateSourceForm sourceId={sourceId} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="sequence">
                <SourceSequenceSection sourceId={sourceId} />
            </TabsContent>
        </Tabs>
    );
}
