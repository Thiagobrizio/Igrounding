import type { TowerID } from "@repo/validators/Ids";

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

import UpdateTowerForm from "../UpdateTowerForm";

export interface UpdateTowerModalProps {
    towerId: TowerID;
}

export default NiceModal.create(({ towerId }: UpdateTowerModalProps) => {
    const modal = useModal();
    const { t } = useTranslation("updateTowerModal");

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
                    <UpdateTowerForm
                        onFinish={() => modal.hide()}
                        towerId={towerId}
                    />
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
});
