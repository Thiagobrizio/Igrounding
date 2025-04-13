import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import SourceCurrentsDiagram from "~/features/sources/components/SourceCurrentsDiagram";

export const Route = createFileRoute("/results/_layout/sources/$sourceId/")({
    component: ResultsSourcePage,
});

export default function ResultsSourcePage() {
    const { sourceId } = Route.useParams();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Source Diagram</CardTitle>
            </CardHeader>
            <CardContent className="h-[750px] w-full">
                <SourceCurrentsDiagram sourceId={sourceId} />
            </CardContent>
        </Card>
    );
}
