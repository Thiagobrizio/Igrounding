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

import { DeleteIcon, EditIcon, MenuIcon } from "~/components/MenuIcons";

import type { TransmissionLine } from "./RowType";

export default function ConductorTableRowActions({
    row,
}: CellContext<TransmissionLine, unknown>) {
    function showDeleteModal() {
        NiceModal.show("delete-transmission-line", {
            lineId: row.original.id,
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
                        params={{
                            lineId: row.original.id,
                        }}
                        to="/project/lines/$lineId"
                    >
                        <EditIcon />
                        <span>Edit</span>
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
