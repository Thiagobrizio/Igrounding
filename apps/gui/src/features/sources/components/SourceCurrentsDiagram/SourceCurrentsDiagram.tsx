import type { SourceID } from "@repo/validators/Ids";

import { type Edge, MarkerType, type Node, ReactFlow } from "@xyflow/react";

import trpc from "~/utils/trpc";

import { nodeTypes } from "./Nodes";

interface SourceCurrentsDiagramProps {
    sourceId: SourceID;
}

export default function SourceCurrentsDiagram({
    sourceId,
}: SourceCurrentsDiagramProps) {
    const [sourceQuery, resultQuery] = trpc.useQueries((t) => {
        return [
            t.source.getById({ id: sourceId }),
            t.solution.getSourceCurrents({ id: sourceId }),
        ];
    });

    if (sourceQuery.isLoading || resultQuery.isLoading)
        return <div>Loading...</div>;
    if (
        sourceQuery.isError ||
        !sourceQuery.data ||
        resultQuery.isError ||
        !resultQuery.data
    )
        return <div>Error</div>;

    const source = sourceQuery.data;
    const result = resultQuery.data;
    const vSources = result.vSource.filter((phase) => phase.phase !== 0);
    const reactors = result.reactor.filter((phase) => phase.phase !== 0);
    const nodes: Node[] = [
        {
            id: "1",
            type: "source",
            data: {
                ...source,
            },
            height: 250,
            width: 250,
            position: { x: 50, y: 50 },
        },
        ...vSources.map((phase, index) => ({
            id: `${index}-${phase.phase}`,
            type: "phase",
            data: {
                phase: phase.phase,
                current: phase.current,
                angle: phase.angle,
            },
            position: { x: 700, y: index * 100 + 50 },
        })),
        ...reactors.map((phase, index) => ({
            id: `${index}-${phase.phase}`,
            type: "ground",
            position: { x: index * 150 + 125, y: 500 },

            data: {
                phase: phase.phase,
                current: phase.current,
                angle: phase.angle,
            },
        })),
    ];

    const edges: Edge[] = [
        ...vSources.map((phase, index) => {
            return {
                id: `${index}-${phase.phase}`,
                source: "1",
                sourceHandle: `right-${index + 1}`,
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                    color: "#FF0072",
                },
                label: `${phase.current?.toFixed(2)}A  ∠${phase.angle?.toFixed(2)}°`,
                labelStyle: {
                    fontSize: 16,
                },
                style: {
                    fontSize: 16,
                    strokeWidth: 2,
                    stroke: "#FF0072",
                },
                target: `${index}-${phase.phase}`,
            };
        }),
        ...reactors.map((phase, index) => {
            return {
                id: `${index}-${phase.phase}`,
                source: "1",
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                    color: "#FF0072",
                },
                label: `${phase.current?.toFixed(2)}A  ∠${phase.angle?.toFixed(2)}°`,
                labelStyle: {
                    fontSize: 16,
                },
                style: {
                    strokeWidth: 2,
                    stroke: "#FF0072",
                },
                sourceHandle: "bottom",
                target: `${index}-${phase.phase}`,
            };
        }),
    ];
    return (
        <div className="h-full w-full border">
            <ReactFlow
                edges={edges}
                nodes={nodes}
                nodeTypes={nodeTypes}
                proOptions={{ hideAttribution: true }}
                viewport={{ x: 0, y: 0, zoom: 1 }}
            >
                {/* <Background /> */}
            </ReactFlow>
        </div>
    );
}
