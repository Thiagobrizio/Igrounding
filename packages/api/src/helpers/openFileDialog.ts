import { dialog } from "electron";

import type { Context } from "..";
export default async function openFileDialog(ctx: Context) {
    const currentBrowser = ctx.electron;

    const openDialogReturn = await dialog.showOpenDialog(currentBrowser, {
        properties: ["openFile"],
        filters: [
            { name: "Project", extensions: ["study"] },
            { name: "All Files", extensions: ["*"] },
        ],
    });

    if (openDialogReturn.canceled) {
        throw new Error("User closed dialog");
    }

    const fileName = openDialogReturn.filePaths[0];
    if (!fileName) {
        throw new Error("Can't get file name");
    }
    return fileName;
}
