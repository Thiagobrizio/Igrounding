import type { CellContext } from "@tanstack/react-table";

import NiceModal from "@ebay/nice-modal-react";
import { Button } from "@repo/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";

import { DeleteIcon, MenuIcon, ViewIcon } from "~/components/MenuIcons";

import type { TowerGeometry } from "./RowType";

export default function RowActions({
    row,
}: CellContext<TowerGeometry, unknown>) {
    function showDeleteModal() {
        NiceModal.show("delete-tower-geometry", {
            geometryId: row.original.id,
        });
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    variant="ghost"
                >
                    <MenuIcon />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link
                        params={{ geometryId: row.original.id }}
                        to="/libraries/tower-geometries/$geometryId"
                    >
                        <ViewIcon />
                        <span>View</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={showDeleteModal}>
                    <DeleteIcon />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
