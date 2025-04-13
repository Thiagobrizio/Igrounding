import type { Source } from "@repo/db/project/sources";
import type { TransmissionLine } from "@repo/db/project/transmissionLines";

import {
    Background,
    BackgroundVariant,
    Controls,
    type Edge,
    type Node,
    ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMemo } from "react";

import type { NodeData, NodeType } from "./nodes/NodeData";

import nodeTypes from "./nodes";

export default function ProjectDiagram({
    sources,
    transmissionLines,
}: {
    sources: Source[];
    transmissionLines: TransmissionLine[];
}) {
    const initialNodes: Node<NodeData, NodeType>[] = useMemo(() => {
        return sources.map((source) => {
            return {
                id: source.id,
                type: "source",
                position: { x: source.x, y: source.y },
                data: {
                    label: source.name,
                    sourceId: source.id,
                },
            };
        });
    }, [sources]);

    const initialEdges: Edge[] = useMemo(() => {
        return transmissionLines.map((tline) => {
            return {
                id: tline.id,
                source: tline.fromSourceId,
                target: tline.toSourceId,
                label: tline.name,
                data: {
                    label: tline.name,
                    lineId: tline.id,
                },
            };
        });
    }, [transmissionLines]);

    return (
        <div className="flex h-full w-full gap-4">
            <div className="w-full h-full">
                <ReactFlow
                    defaultEdges={initialEdges}
                    defaultNodes={initialNodes}
                    nodeTypes={nodeTypes}
                    proOptions={{ hideAttribution: true }}
                >
                    <Controls />
                    <Background
                        gap={12}
                        size={1}
                        variant={BackgroundVariant.Dots}
                    />
                </ReactFlow>
            </div>
        </div>
    );
}
