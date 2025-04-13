import type { LineID } from "@repo/validators/Ids";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@repo/ui/dialog";
import { useTranslation } from "react-i18next";

import CreateTowerForm from "../CreateTowerForm";

export interface CreateTowerModalProps {
    lineId: LineID;
}

export default NiceModal.create(({ lineId }: CreateTowerModalProps) => {
    const { t } = useTranslation("createTowerModal");
    const modal = useModal();
    return (
        <Dialog onOpenChange={() => modal.hide()} open={modal.visible}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("modalTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("modalDescription")}
                    </DialogDescription>
                </DialogHeader>
                <CreateTowerForm
                    lineId={lineId}
                    onFinish={() => modal.hide()}
                />
            </DialogContent>
        </Dialog>
    );
});
