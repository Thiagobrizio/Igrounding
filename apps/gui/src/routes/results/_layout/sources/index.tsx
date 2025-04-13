import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardWrapper,
} from "@repo/ui/card";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Factory } from "lucide-react";

import trpc from "~/utils/trpc";

export const Route = createFileRoute("/results/_layout/sources/")({
    component: ResultsSourcesPage,
});

export default function ResultsSourcesPage() {
    const { data, isLoading, isError } = trpc.source.getAll.useQuery({});

    if (isLoading) return <div>Loading...</div>;
    if (isError || !data) return <div>Error</div>;

    return (
        <CardWrapper>
            <Card>
                <CardHeader>
                    <CardTitle>Sources</CardTitle>
                    <CardDescription>View results</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
                        {data.map((source) => {
                            return (
                                <Link
                                    key={source.id}
                                    params={{ sourceId: source.id }}
                                    to="/results/sources/$sourceId"
                                >
                                    <Card className="flex flex-col items-center justify-center p-4 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                                        <Factory className="h-6 w-6 mb-2" />
                                        <span className="text-sm font-medium">
                                            {source.name}
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
