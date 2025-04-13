import {
    type ChartConfig,
    ChartContainer,
    ChartTooltipContent,
} from "@repo/ui/chart";
import {
    CartesianGrid,
    Label,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import trpc from "~/utils/trpc";

export default function WorstCaseGraph() {
    const { data, isLoading, isError } = trpc.solution.getWorstCase.useQuery();
    if (isLoading) return <div>Loading...</div>;
    if (isError || !data) return <div>Error</div>;
    const chartConfig = {
        current: {
            label: "Current",

            color: "#8884d8",
        },
    } satisfies ChartConfig;
    const fromSource = data.sourceCurrents[0];
    const toSource = data.sourceCurrents[1];
    if (!fromSource || !toSource) return <div>Error</div>;
    const chartData = [
        {
            name: fromSource.name,
            current: fromSource.current.current.toFixed(2),
            angle: fromSource.current.angle,
        },
        ...data.towerCurrents.map((tower) => ({
            name: tower.name,
            current: Number(tower.current.current.toFixed(2)),
            angle: tower.current.angle,
        })),
        {
            name: toSource.name,
            current: toSource.current.current.toFixed(2),
            angle: toSource.current.angle,
        },
    ];
    return (
        <div className="flex justify-center">
            <ChartContainer
                className="min-h-[500px] max-w-screen-lg"
                config={chartConfig}
            >
                <LineChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid />
                    <XAxis dataKey="name">
                        <Label position="insideBottom" value="Location" />
                    </XAxis>
                    <YAxis>
                        <Label
                            angle={-90}
                            offset={0}
                            position="insideLeft"
                            textAnchor="middle"
                            value="Current (A)"
                        />
                    </YAxis>
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line
                        dataKey="current"
                        stroke="#8884d8"
                        strokeWidth={2}
                        type="linear"
                    />
                </LineChart>
            </ChartContainer>
        </div>
    );
}
