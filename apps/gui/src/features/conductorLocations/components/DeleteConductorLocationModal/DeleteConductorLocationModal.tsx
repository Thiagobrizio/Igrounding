import type { LocationID } from "@repo/validators/Ids";

import NiceModal from "@ebay/nice-modal-react";
import toast from "@repo/ui/toast";

import BaseDeleteModal from "~/components/BaseDeleteModal";
import trpc from "~/utils/trpc";

export interface DeleteConductorLocationModalProps {
    conductorLocationId: LocationID;
}

export default NiceModal.create(
    ({ conductorLocationId }: DeleteConductorLocationModalProps) => {
        const utils = trpc.useUtils();
        const deleteMutation = trpc.conductorLocations.delete.useMutation({
            async onSuccess(data) {
                toast.success("Conductor location deleted");
                await utils.conductorLocations.getAllByGeometryId.invalidate({
                    geometryId: data.geometryId,
                });
            },
            onError(error) {
                toast.error("Can't delete Conductor Location");
                console.error(error);
            },
        });

        function handleConfirm() {
            deleteMutation.mutate({ locationId: conductorLocationId });
        }

        return <BaseDeleteModal onConfirm={handleConfirm} />;
    }
);
