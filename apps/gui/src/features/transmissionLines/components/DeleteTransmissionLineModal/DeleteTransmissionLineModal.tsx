import type { LineID } from "@repo/validators/Ids";

import NiceModal from "@ebay/nice-modal-react";
import toast from "@repo/ui/toast";

import BaseDeleteModal from "~/components/BaseDeleteModal";
import trpc from "~/utils/trpc";

export interface DeleteTransmissionLineModalProps {
    lineId: LineID;
}

export default NiceModal.create(
    ({ lineId }: DeleteTransmissionLineModalProps) => {
        const utils = trpc.useUtils();
        const deleteMutation = trpc.transmissionLine.delete.useMutation({
            async onSuccess(values) {
                toast.success(`Transmission Line ${values.name} deleted`);
                await utils.transmissionLine.getAll.invalidate();
            },
            onError(error) {
                toast.error("Failed to delete transmission Line");
                console.error(error);
            },
        });

        function handleConfirm() {
            deleteMutation.mutate({
                id: lineId,
            });
        }

        return <BaseDeleteModal onConfirm={handleConfirm} />;
    }
);
