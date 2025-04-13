/* global console, process */

import { spawn } from "child_process";
import electronPath from "electron";
import { watch } from "rollup";
import { loadConfigFile } from "rollup/loadConfigFile";

const { options, warnings } = await loadConfigFile("./rollup.config.js");

if (warnings.count > 0) {
    console.log(`We currently have ${warnings.count} warnings`);
    // This prints all deferred warnings
    warnings.flush();
}

const watcher = watch(options);

/** @type {import("child_process").ChildProcessWithoutNullStreams } */
let spawnProcess = null;

watcher.on("event", (event) => {
    switch (event.code) {
        case "BUNDLE_END":
            if (event.result) {
                event.result.close();
            }
            break;
        case "END":
            spawnProcess = spawn(String(electronPath), [".", "--inspect"]);
            spawnProcess.stdout.on("data", (d) => {
                const data = d.toString().trim();
                if (!data) return;
                console.warn("[MAIN]: ", data);
            });
            spawnProcess.stderr.on("data", (d) => {
                const data = d.toString().trim();
                if (!data) return;
                console.error("[MAIN]: ", data);
            });
            spawnProcess.on("exit", process.exit);
            break;
        case "ERROR":
            console.error(event.error);
            break;
        case "START":
            if (spawnProcess !== null) {
                console.log("Restarting....");
                spawnProcess.off("exit", process.exit);
                spawnProcess.kill("SIGINT");
                spawnProcess = null;
            } else {
                console.log("Starting....");
            }
            break;
    }
});
