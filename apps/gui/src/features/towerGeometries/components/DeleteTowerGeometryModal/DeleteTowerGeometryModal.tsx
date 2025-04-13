import type { GeometryID } from "@repo/validators/Ids";

import NiceModal from "@ebay/nice-modal-react";
import toast from "@repo/ui/toast";

import BaseDeleteModal from "~/components/BaseDeleteModal";
import trpc from "~/utils/trpc";

export interface DeleteTowerGeometryModalProps {
    geometryId: GeometryID;
}

export default NiceModal.create(
    ({ geometryId }: DeleteTowerGeometryModalProps) => {
        const utils = trpc.useUtils();
        const deleteMutation = trpc.towerGeometry.delete.useMutation({
            onError(error) {
                toast.error("Failed to delete tower geometry");
                console.log(error);
            },
            async onSuccess(data) {
                await utils.towerGeometry.getAll.invalidate();
                toast.success(`${data.name} has been deleted`);
            },
        });

        function handleConfirm() {
            deleteMutation.mutate({ id: geometryId });
        }

        return <BaseDeleteModal onConfirm={handleConfirm} />;
    }
);
