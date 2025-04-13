import { Button } from "@repo/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCopy } from "lucide-react";

import MatrixTable from "~/components/MatrixTable/MatrixTable";
import trpc from "~/utils/trpc";

export const Route = createFileRoute(
    "/project/_layout/lines/$lineId/$towerId/"
)({
    component: LineParametersPage,
});

async function copyToClipboard(matrix: number[][]) {
    const matrixString = matrix.map((row) => row.join("\t")).join("\n");

    await navigator.clipboard.writeText(matrixString);
}
export default function LineParametersPage() {
    const { towerId } = Route.useParams();
    const { data, isLoading, isError } = trpc.tower.getParameters.useQuery({
        towerId,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError || !data) {
        return <div>Error!</div>;
    }

    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>R Matrix</CardTitle>
                    <Button
                        onClick={() => copyToClipboard(data.rMatrix)}
                        size="icon"
                        type="button"
                        variant="secondary"
                    >
                        <ClipboardCopy />
                    </Button>
                </CardHeader>
                <CardContent>
                    <MatrixTable data={data.rMatrix} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>X Matrix</CardTitle>
                    <Button
                        onClick={() => copyToClipboard(data.xMatrix)}
                        size="icon"
                        type="button"
                        variant="secondary"
                    >
                        <ClipboardCopy />
                    </Button>
                </CardHeader>
                <CardContent>
                    <MatrixTable data={data.xMatrix} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>C Matrix</CardTitle>
                    <Button
                        onClick={() => copyToClipboard(data.cMatrix)}
                        size="icon"
                        type="button"
                        variant="secondary"
                    >
                        <ClipboardCopy />
                    </Button>
                </CardHeader>
                <CardContent>
                    <MatrixTable data={data.cMatrix} />
                </CardContent>
            </Card>
        </div>
    );
}
