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

import CreateConductorForm from "../CreateConductorForm";

export interface CreateConductorModalProps {
    lineId: LineID;
}

export default NiceModal.create(({ lineId }: CreateConductorModalProps) => {
    const modal = useModal();
    const { t } = useTranslation("createConductorModal");

    return (
        <Dialog onOpenChange={() => modal.hide()} open={modal.visible}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("modalTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("modalDescription")}
                    </DialogDescription>
                </DialogHeader>
                <CreateConductorForm
                    lineId={lineId}
                    onFinish={() => modal.hide()}
                />
            </DialogContent>
        </Dialog>
    );
});
