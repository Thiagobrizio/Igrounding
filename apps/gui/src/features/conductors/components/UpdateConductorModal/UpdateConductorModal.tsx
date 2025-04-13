import type { ConductorID } from "@repo/validators/Ids";

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

import UpdateConductorForm from "../UpdateConductorForm";

export interface UpdateConductorModalProps {
    conductorId: ConductorID;
}

export default NiceModal.create(
    ({ conductorId }: UpdateConductorModalProps) => {
        const { t } = useTranslation("updateConductorModal");
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
                        <UpdateConductorForm
                            conductorId={conductorId}
                            onFinish={() => modal.hide()}
                        />
                    </DialogContent>
                </DialogPortal>
            </Dialog>
        );
    }
);
