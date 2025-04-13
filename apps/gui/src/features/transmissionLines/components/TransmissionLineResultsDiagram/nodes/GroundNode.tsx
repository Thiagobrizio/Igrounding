import { Handle, Position } from "@xyflow/react";

export interface GroundNodeData extends Record<string, unknown> {
    phase: number;
    current: number;
    angle: number;
}

export default function GroundNode() {
    return (
        <>
            <Handle id="top" position={Position.Top} type="target" />
            <div className="flex items-center justify-center border w-full h-full p-4 border-black bg-background text-5xl">
                ⏚
            </div>
        </>
    );
}
