import type { LocationID } from "@repo/validators/Ids";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from "@repo/ui/dialog";
import { useTranslation } from "react-i18next";

import UpdateConductorLocationForm from "../UpdateConductorLocationForm";

export interface UpdateConductorLocationModalProps {
    conductorLocationId: LocationID;
}

export default NiceModal.create(
    ({ conductorLocationId }: UpdateConductorLocationModalProps) => {
        const { t } = useTranslation("updateConductorLocationModal");
        const modal = useModal();
        return (
            <Dialog onOpenChange={() => modal.hide()} open={modal.visible}>
                <DialogPortal>
                    <DialogOverlay />
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t("modalTitle")}</DialogTitle>
                            <DialogDescription>
                                {t("modalDescription")}
                            </DialogDescription>
                        </DialogHeader>
                        <UpdateConductorLocationForm
                            conductorLocationId={conductorLocationId}
                            onFinish={() => modal.hide()}
                        />
                    </DialogContent>
                </DialogPortal>
            </Dialog>
        );
    }
);
