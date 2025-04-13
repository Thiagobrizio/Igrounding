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

import type { ConductorType } from "./RowType";

export default function ConductorTypeTableActions({
    row,
}: CellContext<ConductorType, unknown>) {
    function showDeleteModal() {
        NiceModal.show("delete-conductor-type", {
            typeId: row.original.id,
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
                        params={{ typeId: row.original.id }}
                        to="/libraries/conductor-types/$typeId"
                    >
                        <ViewIcon />
                        View
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={showDeleteModal}>
                    <DeleteIcon />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
