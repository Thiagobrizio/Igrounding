import NiceModal from "@ebay/nice-modal-react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@repo/ui/context-menu";
import { Link } from "@tanstack/react-router";
import { Handle, Position } from "@xyflow/react";
import { Factory } from "lucide-react";

import type { NodeData } from "./NodeData";

interface SourceProps {
    data: NodeData;
}

export default function Source({ data }: SourceProps) {
    function showDeleteModal() {
        NiceModal.show("delete-source", {
            sourceId: data.sourceId,
        });
    }

    return (
        <div>
            <Handle position={Position.Left} type="target" />
            <div>
                <ContextMenu>
                    <ContextMenuTrigger>
                        <div className="border bg-white p-4 flex flex-col justify-center items-center">
                            <Factory />
                            {data.label}
                        </div>
                    </ContextMenuTrigger>

                    <ContextMenuContent>
                        <ContextMenuItem asChild>
                            <Link
                                params={{
                                    sourceId: data.sourceId,
                                }}
                                to="/project/sources/$sourceId"
                            >
                                View
                            </Link>
                        </ContextMenuItem>
                        <ContextMenuItem onClick={showDeleteModal}>
                            Delete
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </div>
            <Handle position={Position.Right} type="source" />
        </div>
    );
}
