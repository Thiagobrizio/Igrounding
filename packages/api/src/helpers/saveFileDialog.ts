import { dialog } from "electron";

import type { Context } from "..";

export default async function saveFileDialog(ctx: Context) {
    const currentBrowser = ctx.electron;

    const saveDialogReturn = await dialog.showSaveDialog(currentBrowser, {
        filters: [
            { name: "Project", extensions: ["study"] },
            { name: "All Files", extensions: ["*"] },
        ],
    });

    if (saveDialogReturn.canceled) {
        throw new Error("User closed dialog");
    }

    const fileName = saveDialogReturn.filePath;

    return fileName;
}
