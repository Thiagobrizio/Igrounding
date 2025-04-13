import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardToolbar,
    CardWrapper,
} from "@repo/ui/card";
import { createFileRoute } from "@tanstack/react-router";

import FaultLocationForm from "~/features/solutions/FaultLocationForm";

export const Route = createFileRoute("/results/_layout/")({
    component: ResultsPage,
});

export default function ResultsPage() {
    return (
        <CardWrapper>
            <CardToolbar></CardToolbar>
            <Card>
                <CardHeader>
                    <CardTitle>Parameters</CardTitle>
                    <CardDescription>
                        Please choose the location of the fault
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FaultLocationForm />
                </CardContent>
            </Card>
        </CardWrapper>
    );
}
