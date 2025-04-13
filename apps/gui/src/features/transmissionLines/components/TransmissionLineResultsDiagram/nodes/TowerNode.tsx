import type { TowerID } from "@repo/validators/Ids";

import { Handle, type Node, type NodeProps, Position } from "@xyflow/react";

export interface TowerNodeData extends Record<string, unknown> {
    id: TowerID;
    name: string;
    conductors: number;
}
export type TowerNode = Node<TowerNodeData, "tower">;

export default function TowerNode({ height, data }: NodeProps<TowerNode>) {
    const handles = new Array(data.conductors).fill(0);
    const gap = height ? height / handles.length : 12.5;
    return (
        <>
            {handles.map((_, index) => (
                <Handle
                    id={`left-${index}`}
                    key={index}
                    position={Position.Left}
                    style={{ top: index * gap }}
                    type="target"
                />
            ))}
            <div className="flex items-center justify-center border w-full h-full p-4 border-black bg-background">
                {data.name}
            </div>
            {handles.map((_, index) => (
                <Handle
                    id={`right-${index}`}
                    key={index}
                    position={Position.Right}
                    style={{ top: index * gap }}
                    type="source"
                />
            ))}
            <Handle id="bottom" position={Position.Bottom} type="source" />
        </>
    );
}
