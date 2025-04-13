/// <reference types="vitest" />

import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [TanStackRouterVite(), react(), tsconfigPaths()],
    base: "./",
    test: {
        environment: "jsdom",
        setupFiles: "./tests/setup.tsx",
    },
});
