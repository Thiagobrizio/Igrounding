import type { GeometryID } from "@repo/validators/Ids";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@repo/ui/dialog";
import { useTranslation } from "react-i18next";

import CreateConductorLocationForm from "../CreateConductorLocationForm";

export interface CreateConductorLocationModalProps {
    geometryId: GeometryID;
}

export default NiceModal.create(
    ({ geometryId }: CreateConductorLocationModalProps) => {
        const modal = useModal();
        const { t } = useTranslation("createConductorLocationModal");
        return (
            <Dialog onOpenChange={() => modal.hide()} open={modal.visible}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("modalTitle")}</DialogTitle>
                        <DialogDescription>
                            {t("modalDescription")}
                        </DialogDescription>
                    </DialogHeader>
                    <CreateConductorLocationForm
                        geometryId={geometryId}
                        onFinish={() => modal.hide()}
                    />
                </DialogContent>
            </Dialog>
        );
    }
);
