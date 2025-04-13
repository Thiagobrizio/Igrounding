import { publicProcedure, router } from "../trpc";

export default router({
    hello: publicProcedure.query(() => "hello world!"),
    version: publicProcedure.query(() => {
        const version = process.env["npm_package_version"] || "1.0.3";
        return version;
    }),
});
