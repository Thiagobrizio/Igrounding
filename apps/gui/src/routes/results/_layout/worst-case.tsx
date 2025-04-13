import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { createFileRoute } from "@tanstack/react-router";

import WorstCaseGraph from "~/features/solutions/WorstCaseGraph";
import WorstCaseTable from "~/features/solutions/WorstCaseTable";

export const Route = createFileRoute("/results/_layout/worst-case")({
    component: WorstCaseScenarioPage,
});

export default function WorstCaseScenarioPage() {
    return (
        <Tabs defaultValue="table">
            <TabsList>
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="graph">Graph</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
                <Card>
                    <CardHeader>
                        <CardTitle>Worst Case Scenario</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WorstCaseTable />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="graph">
                <Card>
                    <CardHeader>
                        <CardTitle>Worst Case Scenario</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WorstCaseGraph />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
