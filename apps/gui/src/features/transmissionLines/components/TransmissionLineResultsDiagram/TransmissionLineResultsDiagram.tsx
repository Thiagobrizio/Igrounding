import type { LineID } from "@repo/validators/Ids";

import { Background, MarkerType, ReactFlow } from "@xyflow/react";

import trpc, { type RouterOutputs } from "~/utils/trpc";

import type { LineNode } from "./nodes/LineSegmentNode";
import type { TowerNode } from "./nodes/TowerNode";

import nodeTypes from "./nodes";

interface TransmissionLineResultsDiagramProps {
    lineId: LineID;
}

export default function TransmissionLineResultsDiagram({
    lineId,
}: TransmissionLineResultsDiagramProps) {
    const {
        isLoading,
        isError,
        data: result,
    } = trpc.solution.getLineCurrents.useQuery({
        id: lineId,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError || !result) return <div>Error</div>;

    const nodes = [
        ...result.towers.map((tower, index) => {
            return getTowerNodes(tower, index);
        }),
        ...result.lines.map((line, index) => {
            return getLineSegmentNodes(line, index);
        }),
        ...result.towers.flatMap((tower, index) => {
            return getGroundNodes(tower, index);
        }),
    ];

    const edges = [
        ...result.lines.flatMap((line, index) => {
            return getLineSegmentEdges(line, index, line.id);
        }),
        ...result.towers.map((tower, index) => {
            return getGroundEdges(tower, index);
        }),
    ];

    return (
        <>
            <ReactFlow
                edges={edges}
                nodes={nodes}
                nodeTypes={nodeTypes}
                proOptions={{ hideAttribution: true }}
            >
                <Background />
            </ReactFlow>
        </>
    );
}

// Change
const xOffset = 100;
const yOffset = 100;
const towerWidth = 300;
const towerHeight = 300;
const lineWidth = 100;
const lineHeight = 300;
const xGap = 500;
const yGap = 200;
// Don't change
const multiplier = towerWidth + 2 * xGap + lineWidth;
const towerxOffset = xOffset + lineWidth + xGap;
const lineyOffset = yOffset + towerHeight / 2 - lineHeight / 2;

function getLineSegmentNodes(
    line: RouterOutputs["solution"]["getLineCurrents"]["lines"][number],
    index: number
) {
    const lineSegmentNode: LineNode = {
        id: `${index}-${line.id}`,
        type: "line",
        data: {
            id: line.id,
            conductors: 8,
        },
        width: lineWidth,
        height: lineHeight,
        position: { x: index * multiplier + xOffset, y: lineyOffset },
    };
    return lineSegmentNode;
}

function getTowerNodes(
    tower: RouterOutputs["solution"]["getLineCurrents"]["towers"][number],
    index: number
) {
    const towerNode: TowerNode = {
        id: `${tower.id}`,
        type: "tower",
        data: {
            id: tower.id,
            name: tower.name,
            conductors: 8,
        },
        width: towerWidth,
        height: towerHeight,
        position: { x: towerxOffset + index * multiplier, y: yOffset },
    };

    return towerNode;
}

const groundHeight = 100;
const groundWidth = 100;
const groundxOffset = towerxOffset + (towerWidth / 2 - groundWidth / 2);

function getGroundNodes(
    tower: RouterOutputs["solution"]["getLineCurrents"]["towers"][number],
    index: number
) {
    return {
        id: `${tower.id}-GND`,
        type: "ground",
        data: {},
        width: groundWidth,
        height: groundHeight,
        position: {
            x: groundxOffset + index * multiplier,
            y: yOffset + yGap + towerHeight,
        },
    };
}

function getLineSegmentEdges(
    lineSegment: RouterOutputs["solution"]["getLineCurrents"]["lines"][number],
    index: number,
    lineId: LineID
) {
    const inSegments = lineSegment.inCurrents.map((linePhase, index2) => {
        return {
            id: `in-${index}-${index2}`,
            source: `${lineSegment.fromTower}`,
            sourceHandle: `right-${index2}`,
            target: `${index}-${lineId}`,
            targetHandle: `left-${index2}`,
            data: {
                phase: linePhase.phase,
                current: linePhase.current,
                angle: linePhase.angle,
            },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: "#FF0072",
            },
            label: `Phase ${linePhase.phase}: ${linePhase.current?.toFixed(2)}A  ∠${linePhase.angle?.toFixed(2)}°`,
            labelStyle: {
                fontSize: 16,
            },
            style: {
                strokeWidth: 2,
                stroke: "#FF0072",
            },
        };
    });

    const outSegments = lineSegment.outCurrents.map((linePhase, index2) => {
        return {
            id: `out-${index}-${index2}`,
            source: `${index}-${lineId}`,
            sourceHandle: `right-${index2}`,
            target: `${lineSegment.toTower}`,
            targetHandle: `left-${index2}`,
            data: {
                phase: linePhase.phase,
                current: linePhase.current,
                angle: linePhase.angle,
            },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: "#FF0072",
            },
            label: `Phase ${linePhase.phase}: ${linePhase.current?.toFixed(2)}A  ∠${linePhase.angle?.toFixed(2)}°`,
            labelStyle: {
                fontSize: 16,
            },
            style: {
                strokeWidth: 2,
                stroke: "#FF0072",
            },
        };
    });

    return [...inSegments, ...outSegments];
}

function getGroundEdges(
    tower: RouterOutputs["solution"]["getLineCurrents"]["towers"][number],
    index: number
) {
    return {
        id: `gnd-edge-${index}`,
        source: `${tower.id}`,
        sourceHandle: `bottom`,
        target: `${tower.id}-GND`,
        targetHandle: `top`,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
            color: "#FF0072",
        },
        label: `${tower.current?.toFixed(2)}A ∠${tower.angle?.toFixed(2)}°`,
        labelStyle: {
            fontSize: 16,
        },
        style: {
            strokeWidth: 2,
            stroke: "#FF0072",
        },
    };
}
