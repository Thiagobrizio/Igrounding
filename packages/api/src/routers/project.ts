import { createProject, openProject } from "@repo/db";
import { app } from "electron";

import openFileDialog from "../helpers/openFileDialog";
import saveFileDialog from "../helpers/saveFileDialog";
import { projectProcedure, publicProcedure, router } from "../trpc";

export default router({
    isOpen: publicProcedure.query(async ({ ctx }) => {
        if (!ctx.project.db) {
            return false;
        }
        if (ctx.project.db.$client.open) {
            return true;
        }
        return false;
    }),
    filePath: publicProcedure.query(({ ctx }) => {
        return ctx.project.fileName;
    }),
    open: publicProcedure.mutation(async ({ ctx }) => {
        const fileName = await openFileDialog(ctx);
        ctx.project.fileName = fileName;
        const db = await openProject(fileName, app.getPath("sessionData"));
        ctx.project.db = db;

        return true;
    }),
    create: publicProcedure
        // .input(createProjectSchema)
        .mutation(async ({ ctx }) => {
            const fileName = await saveFileDialog(ctx);

            const db = await createProject(
                fileName,
                app.getPath("sessionData")
            );
            ctx.project.db = db;
            ctx.project.fileName = fileName;
            return true;
        }),
    close: projectProcedure.mutation(async ({ ctx }) => {
        ctx.closeProject();
    }),
    save: projectProcedure.mutation(async ({ ctx }) => {
        // TODO
        await ctx.project.db.$client.backup(ctx.project.fileName);
        return true;
    }),

    saveAs: projectProcedure.mutation(async ({ ctx }) => {
        const fileName = await saveFileDialog(ctx);
        console.log(fileName);
        // TODO: maybe include versioning, conductor types and tower geometries used in the project.
        await ctx.project.db.$client.backup(fileName);
        ctx.project.db.$client.close();
        ctx.project.fileName = fileName;
        const db = await openProject(fileName, app.getPath("sessionData"));

        ctx.project.db = db;
    }),
});
