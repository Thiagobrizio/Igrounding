import NiceModal from "@ebay/nice-modal-react";

import "~/utils/modals";

export default function ModalProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <NiceModal.Provider>{children}</NiceModal.Provider>;
}
