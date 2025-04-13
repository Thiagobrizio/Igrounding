import { is } from "@electron-toolkit/utils";
import { BrowserWindow, screen, shell } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function createWindow() {
    // Create the browser window.
    const displays = screen.getAllDisplays();
    const externalDisplay = displays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0;
    });

    const mainWindow = new BrowserWindow({
        x: externalDisplay ? externalDisplay.bounds.x : 0,
        y: externalDisplay ? externalDisplay.bounds.y : 0,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "./preload.cjs"),
        },
    });

    mainWindow.on("ready-to-show", () => {
        mainWindow.maximize();
        mainWindow.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: "deny" };
    });

    if (is.dev) {
        console.log("dev");
        await mainWindow.loadURL("http://localhost:5173/");
    } else {
        console.log(path.join(__dirname, "../renderer/index.html"));
        await mainWindow.loadFile(
            path.join(__dirname, "../renderer/index.html")
        );
    }

    return mainWindow;
}
