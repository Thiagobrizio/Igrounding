import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardWrapper,
} from "@repo/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { UtilityPole } from "lucide-react";

import trpc from "~/utils/trpc";

export const Route = createFileRoute("/results/_layout/lines/")({
    component: ResultsLinesPage,
});

export default function ResultsLinesPage() {
    const { data, isLoading, isError } = trpc.transmissionLine.getAll.useQuery(
        {}
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError || !data) return <div>Error</div>;

    return (
        <CardWrapper>
            <Card>
                <CardHeader>
                    <CardTitle>Lines</CardTitle>
                    <CardDescription>View results</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
                        {data.map((line) => {
                            return (
                                <Link
                                    params={{ lineId: line.id }}
                                    to="/results/lines/$lineId"
                                >
                                    <Card className="flex flex-col items-center justify-center p-4 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                                        <UtilityPole className="h-6 w-6 mb-2" />
                                        <span className="text-sm font-medium">
                                            {line.name}
                                        </span>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </CardWrapper>
    );
}
