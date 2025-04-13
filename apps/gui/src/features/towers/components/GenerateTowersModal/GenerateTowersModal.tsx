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

import GenerateTowersForm from "../GenerateTowersForm";

export interface GenerateTowersModalProps {
    lineId: LineID;
}

export default NiceModal.create(({ lineId }: GenerateTowersModalProps) => {
    const { t } = useTranslation("generateTowersModal");
    const modal = useModal();
    return (
        <Dialog onOpenChange={() => modal.hide()} open={modal.visible}>
            <DialogHeader>
                <DialogTitle>{t("modalTitle")}</DialogTitle>
                <DialogDescription>{t("modalDescription")}</DialogDescription>
            </DialogHeader>
            <DialogContent>
                <GenerateTowersForm
                    lineId={lineId}
                    onFinish={() => modal.hide()}
                />
            </DialogContent>
        </Dialog>
    );
});
