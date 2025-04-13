import type { GeometryID } from "@repo/validators/Ids";

import {
    CartesianGrid,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    XAxis,
    YAxis,
} from "recharts";

import trpc from "~/utils/trpc";

interface ConductorLocationDiagramProps {
    geometryId: GeometryID;
}

export default function ConductorLocationDiagram({
    geometryId,
}: ConductorLocationDiagramProps) {
    const {
        data = [],
        isError,
        isLoading,
    } = trpc.conductorLocations.getAllByGeometryId.useQuery({ geometryId });
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    return (
        <ResponsiveContainer aspect={16 / 9} width="100%">
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 10,
                    left: 10,
                }}
                width={730}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="x"
                    domain={[-20, 20]}
                    name="X"
                    type="number"
                    unit="m"
                />
                <YAxis
                    dataKey="y"
                    domain={[0, "auto"]}
                    name="Y"
                    type="number"
                    unit="m"
                />
                <Scatter data={data} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    );
}
