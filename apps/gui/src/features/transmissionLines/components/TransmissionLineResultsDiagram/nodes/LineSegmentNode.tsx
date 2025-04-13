import type { LineID } from "@repo/validators/Ids";

import { Handle, type Node, type NodeProps, Position } from "@xyflow/react";

export interface LineNodeData extends Record<string, unknown> {
    id: LineID;
    conductors: number;
}
export type LineNode = Node<LineNodeData, "line">;

export default function LineSegmentNode({ height, data }: NodeProps<LineNode>) {
    const handles = new Array(data.conductors).fill(0);
    const gap = height ? height / handles.length : 12.5;

    return (
        <>
            {handles.map((_, index) => {
                return (
                    <Handle
                        id={`left-${index}`}
                        key={index}
                        position={Position.Left}
                        style={{ top: index * gap }}
                        type="target"
                    />
                );
            })}
            <div className="flex items-center justify-center border border-black p-4 w-full h-full bg-background">
                Line
            </div>
            {handles.map((_, index) => {
                return (
                    <Handle
                        id={`right-${index}`}
                        key={index}
                        position={Position.Right}
                        style={{ top: index * gap }}
                        type="source"
                    />
                );
            })}
        </>
    );
}
