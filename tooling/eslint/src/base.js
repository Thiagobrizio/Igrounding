import eslint from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import tseslint from "typescript-eslint";

export default [
    eslint.configs.recommended,
    {
        ...perfectionist.configs["recommended-natural"],
        rules: {
            ...perfectionist.configs["recommended-natural"].rules,
            "perfectionist/sort-objects": "off",
            "perfectionist/sort-object-types": "off",
            "perfectionist/sort-interfaces": "off",
            "perfectionist/sort-union-types": "off",
            "perfectionist/sort-intersection-types": "off",
        },
    },
    ...tseslint.config(
        ...tseslint.configs.strict,
        ...tseslint.configs.stylistic
    ),
    {
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                    caughtErrors: "all",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                },
            ],
        },
    },
    {
        ignores: [
            "dist/",
            "eslint.config.js",
            ".next/",
            "node_modules/",
            ".turbo/",
            "releases/",
        ],
    },
];
