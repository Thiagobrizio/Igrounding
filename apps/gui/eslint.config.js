// @ts-check
import reactConfig from "@repo/eslint-config/react.js";
import baseConfig from "@repo/eslint-config/base.js";

/** @type {import("eslint").Linter.Config[]} */
export default [...baseConfig, ...reactConfig];
