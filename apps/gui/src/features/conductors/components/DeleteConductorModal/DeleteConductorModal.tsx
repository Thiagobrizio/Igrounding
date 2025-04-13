import type { ConductorID } from "@repo/validators/Ids";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import toast from "@repo/ui/toast";

import BaseDeleteModal from "~/components/BaseDeleteModal";
import trpc from "~/utils/trpc";

export interface DeleteConductorModalProps {
    conductorId: ConductorID;
}

export default NiceModal.create(
    ({ conductorId }: DeleteConductorModalProps) => {
        const utils = trpc.useUtils();
        const modal = useModal();
        const deleteMutation = trpc.conductor.delete.useMutation({
            async onSuccess(data) {
                toast.success("Conductor deleted");
                await utils.conductor.getAll.invalidate({
                    lineId: data.lineId,
                });
                await modal.hide();
            },
            onError(error) {
                toast.error("Can't delete Conductor");
                console.error(error);
            },
        });

        function handleConfirm() {
            deleteMutation.mutate({ id: conductorId });
        }

        return <BaseDeleteModal onConfirm={handleConfirm} />;
    }
);
