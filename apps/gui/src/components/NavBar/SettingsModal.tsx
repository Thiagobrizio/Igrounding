import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@repo/ui/dialog";
import { useTranslation } from "react-i18next";

export default NiceModal.create(() => {
    const { t } = useTranslation("settingsModal");
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
            </DialogContent>
        </Dialog>
    );
});
