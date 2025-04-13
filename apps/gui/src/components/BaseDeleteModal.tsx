import { useModal } from "@ebay/nice-modal-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogTitle,
} from "@repo/ui/alert-dialog";
import { buttonVariants } from "@repo/ui/button";
import { useTranslation } from "react-i18next";

interface BaseModalProps {
    onConfirm: () => void;
}

export default function BaseDeleteModal({ onConfirm }: BaseModalProps) {
    const { t } = useTranslation("general");
    const modal = useModal();
    return (
        <AlertDialog onOpenChange={() => modal.hide()} open={modal.visible}>
            <AlertDialogPortal>
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {t("confirmationTitle")}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {t("cannotUndo")}
                            <br />
                            {t("deletionWarning")}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            {t("form:cancel")}
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className={buttonVariants({
                                variant: "destructive",
                            })}
                            onClick={onConfirm}
                        >
                            {t("form:delete")}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogPortal>
        </AlertDialog>
    );
}
