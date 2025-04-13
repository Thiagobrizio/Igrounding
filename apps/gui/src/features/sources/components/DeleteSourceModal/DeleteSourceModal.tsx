import type { SourceID } from "@repo/validators/Ids";

import NiceModal from "@ebay/nice-modal-react";
import toast from "@repo/ui/toast";

import BaseDeleteModal from "~/components/BaseDeleteModal";
import trpc from "~/utils/trpc";

export interface DeleteSourceModalProps {
    sourceId: SourceID;
}

export default NiceModal.create(({ sourceId }: DeleteSourceModalProps) => {
    const utils = trpc.useUtils();
    const deleteMutation = trpc.source.delete.useMutation({
        async onSuccess(values) {
            toast.success(`Source ${values.name} deleted`);
            await utils.source.getAll.invalidate({});
        },
        onError(error) {
            toast.error("Failed to delete source");
            console.error("Failed to delete source", error);
        },
    });

    function handleConfirm() {
        deleteMutation.mutate({
            id: sourceId,
        });
    }

    return <BaseDeleteModal onConfirm={handleConfirm} />;
});
