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

import { DeleteIcon, MenuIcon, ViewIcon } from "~/components/MenuIcons";

import type { ConductorLocation } from "./type";

export default function RowActions({
    row,
}: CellContext<ConductorLocation, unknown>) {
    function showUpdateModal() {
        NiceModal.show("update-conductor-location", {
            conductorLocationId: row.original.id,
        });
    }

    function showDeleteModal() {
        NiceModal.show("delete-conductor-location", {
            conductorLocationId: row.original.id,
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
                <DropdownMenuItem onClick={showUpdateModal}>
                    <ViewIcon />
                    <span>View</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={showDeleteModal}>
                    <DeleteIcon />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
