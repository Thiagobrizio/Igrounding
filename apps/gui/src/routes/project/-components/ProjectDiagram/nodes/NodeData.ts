import type { SourceID } from "@repo/validators/Ids";

export interface NodeData extends Record<string, unknown> {
    label: string;
    sourceId: SourceID;
}

export type NodeType = "source";
