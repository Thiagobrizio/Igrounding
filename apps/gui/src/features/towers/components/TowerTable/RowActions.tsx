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

import {
    DeleteIcon,
    EditIcon,
    MenuIcon,
    ViewIcon,
} from "~/components/MenuIcons";

import type { TransmissionTower } from "./RowType";

export default function RowActions({
    row,
}: CellContext<TransmissionTower, unknown>) {
    function showUpdateModal() {
        NiceModal.show("update-tower", {
            towerId: row.original.id,
        });
    }
    function showDeleteModal() {
        NiceModal.show("delete-tower", {
            towerId: row.original.id,
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
                        from="/project/lines/$lineId"
                        params={{
                            towerId: row.original.id,
                        }}
                        to="/project/lines/$lineId/$towerId"
                    >
                        <ViewIcon />
                        <span>View</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={showUpdateModal}>
                    <EditIcon />
                    <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={showDeleteModal}>
                    <DeleteIcon />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
