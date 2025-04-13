import type { SourceID } from "@repo/validators/Ids";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";
import { t } from "i18next";

import MatrixTable from "~/components/MatrixTable";
import trpc from "~/utils/trpc";

interface SourceSequenceSectionProps {
    sourceId: SourceID;
}

export default function SourceSequenceSection({
    sourceId,
}: SourceSequenceSectionProps) {
    const { data, isLoading, isError } =
        trpc.source.getPhaseComponents.useQuery({
            id: sourceId,
        });

    if (isLoading) {
        return <div>{t("general:loading")}</div>;
    }
    if (isError || !data) {
        return <div>{t("general:errorMessage")}</div>;
    }
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Z Sequence Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        Z0: {data.z0.re} + j{data.z0.im}
                    </div>
                    <div>
                        Z1: {data.z1.re} + j{data.z1.im}
                    </div>
                    <div>
                        Z2: {data.z2.re} + j{data.z2.im}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Z Phase Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                    <MatrixTable data={data.phaseMatrix.data} />
                </CardContent>
            </Card>
        </div>
    );
}
