import type { Config } from "drizzle-kit";

export default {
    schema: "./src/project/*.ts",
    out: "./src/migrations",
    dialect: "sqlite",
} satisfies Config;
