import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import trpc from "~/utils/trpc";

export const Route = createFileRoute("/results/_layout/script")({
    component: ScriptPage,
});

export default function ScriptPage() {
    const { data, isLoading, isError } = trpc.solution.getScript.useQuery();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    return (
        <Card>
            <CardHeader>
                <CardTitle>OpenDSS Script</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
                <div className="overflow-auto text-white bg-black rounded-sm p-4 h-[600px]">
                    <pre>{data?.join("\n")}</pre>
                </div>
            </CardContent>
        </Card>
    );
}
