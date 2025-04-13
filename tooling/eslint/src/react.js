import reactPlugin from "eslint-plugin-react";
// import hooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
        ...reactPlugin.configs.flat["jsx-runtime"],
    },
    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
        ...reactPlugin.configs.flat.recommended,
        rules: {
            "react/prop-types": "off",
        },
        languageOptions: {
            ...reactPlugin.configs.flat.recommended.languageOptions,
            globals: {
                ...globals.browser,
            },
        },
    },
];
