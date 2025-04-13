import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardWrapper,
} from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import TransmissionLineResultsDiagram from "~/features/transmissionLines/components/TransmissionLineResultsDiagram";

export const Route = createFileRoute("/results/_layout/lines/$lineId/")({
    component: ResultsLinesPage,
});

export default function ResultsLinesPage() {
    const { lineId } = Route.useParams();

    return (
        <CardWrapper>
            <Card>
                <CardHeader>
                    <CardTitle>Results</CardTitle>
                    <CardDescription>View results</CardDescription>
                </CardHeader>
                <CardContent className="h-[750px] w-full">
                    <TransmissionLineResultsDiagram lineId={lineId} />
                </CardContent>
            </Card>
        </CardWrapper>
    );
}
