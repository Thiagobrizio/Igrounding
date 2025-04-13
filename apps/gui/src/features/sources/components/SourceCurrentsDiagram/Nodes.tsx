import { Handle, Position } from "@xyflow/react";

interface PhaseNodeData {
    phase: number;
    current: number;
    angle: number;
}

interface SourceNodeData {
    name: string;
}

export const nodeTypes = {
    source: SourceNode,
    ground: GroundNode,
    phase: PhaseNode,
};

export function GroundNode() {
    return (
        <>
            <Handle position={Position.Top} type="target" />
            <div className="border w-full h-full p-4 border-black">Ground</div>
        </>
    );
}

export function SourceNode({ data }: { data: SourceNodeData }) {
    return (
        <>
            <Handle
                id="right-1"
                position={Position.Right}
                style={{ top: 50 }}
                type="source"
            />
            <Handle id="right-2" position={Position.Right} type="source" />
            <Handle
                id="right-3"
                position={Position.Right}
                style={{ bottom: 30, top: "auto" }}
                type="source"
            />
            <div className="flex items-center justify-center border w-full h-full p-4 border-black">
                {data.name}
            </div>
            <Handle id="bottom" position={Position.Bottom} type="source" />
        </>
    );
}

export function PhaseNode({ data }: { data: PhaseNodeData }) {
    return (
        <>
            <Handle position={Position.Left} type="target" />
            <div className="border border-black p-4 w-full h-full">
                Phase {data.phase}
            </div>
        </>
    );
}
