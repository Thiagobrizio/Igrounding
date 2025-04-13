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

import GenerateConductorsForm from "../GenerateConductorsForm";

export interface GenerateConductorsModalProps {
    lineId: LineID;
}

export default NiceModal.create(({ lineId }: GenerateConductorsModalProps) => {
    const { t } = useTranslation("generateConductorsModal");
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
                <GenerateConductorsForm
                    lineId={lineId}
                    onFinish={() => modal.hide()}
                />
            </DialogContent>
        </Dialog>
    );
});
