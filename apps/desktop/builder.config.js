// @ts-check
/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
export default {
    appId: "com.electron.app",
    productName: "Igrounding",
    // Use asar and compression when debugging build process.
    asar: false,
    compression: "store",
    publish: null,
    // asarUnpack: ["database.sqlite"],
    electronLanguages: ["en-GB", "en-US", "pt-BR", "pt-PT"],
    directories: {
        output: "../../releases",
    },
    files: [
        "!builder.config.js",
        "!.turbo",
        "!src",
        "!scripts",
        "!rollup.config.js",
        "!tsconfig.json",
        "!playwright.config.ts",
        "!eslint.config.js",
        {
            from: "../gui/dist",
            to: "./renderer/",
        },
    ],
};
