import type { ConductorTypeID } from "@repo/validators/Ids";

import NiceModal from "@ebay/nice-modal-react";
import toast from "@repo/ui/toast";

import BaseDeleteModal from "~/components/BaseDeleteModal";
import trpc from "~/utils/trpc";

export interface DeleteConductorTypeModalProps {
    typeId: ConductorTypeID;
    onClose: () => void;
}

export default NiceModal.create(({ typeId }: DeleteConductorTypeModalProps) => {
    const utils = trpc.useUtils();
    const deleteMutation = trpc.conductorType.delete.useMutation({
        onSuccess: async (data) => {
            await utils.conductorType.getAll.invalidate();
            toast.success(`${data.name} has been deleted`);
        },
        onError: (error) => {
            toast.error("Failed to delete conductor Type");
            console.log(error);
        },
    });

    function handleConfirm() {
        deleteMutation.mutate({ id: typeId });
    }

    return <BaseDeleteModal onConfirm={handleConfirm} />;
});
