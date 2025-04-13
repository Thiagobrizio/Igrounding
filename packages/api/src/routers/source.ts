import { eq } from "@repo/db/drizzle";
import { sources } from "@repo/db/project/sources";
import calculateZPhaseComponents from "@repo/solution/calculateZPhaseComponents";
import calculateZSequenceComponents from "@repo/solution/calculateZSequenceComponents";
import {
    createSourceSchema,
    deleteSourceSchema,
    getAllSourcesSchema,
    getPhaseComponentsSchema,
    getSourceByIdSchema,
    updateSourcePositionsSchema,
    updateSourceSchema,
} from "@repo/validators/schemas/Source.schema";
import { TRPCError } from "@trpc/server";

import { projectProcedure, router } from "../trpc";

export default router({
    getAll: projectProcedure
        .input(getAllSourcesSchema)
        .query(async ({ ctx }) => {
            const allSources = await ctx.project.db.select().from(sources);

            return allSources;
            // return ctx.store.project.sources;
        }),
    getById: projectProcedure
        .input(getSourceByIdSchema)
        .query(async ({ input, ctx }) => {
            const [source] = await ctx.project.db
                .select()
                .from(sources)
                .where(eq(sources.id, input.id));
            if (!source) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Source not found",
                });
            }
            return source;
        }),
    create: projectProcedure
        .input(createSourceSchema)
        .mutation(async ({ input, ctx }) => {
            const source = {
                enabled: true,
                x: 0,
                y: 0,
                ...input,
            };
            const [newSource] = await ctx.project.db
                .insert(sources)
                .values(source)
                .returning();

            if (!newSource) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create source",
                });
            }
            return newSource;
        }),
    update: projectProcedure
        .input(updateSourceSchema)
        .mutation(async ({ input, ctx }) => {
            const [updatedSource] = await ctx.project.db
                .update(sources)
                .set(input)
                .where(eq(sources.id, input.id))
                .returning();
            if (!updatedSource) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create source",
                });
            }
            return updatedSource;
        }),
    updatePosition: projectProcedure
        .input(updateSourcePositionsSchema)
        .mutation(async ({ input, ctx }) => {
            for await (const source of input) {
                const [updatedSource] = await ctx.project.db
                    .update(sources)
                    .set(source)
                    .where(eq(sources.id, source.id))
                    .returning();
                if (!updatedSource) {
                    throw new TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: `Failed to update source ${source.id}`,
                    });
                }
            }
            return true;
        }),
    delete: projectProcedure
        .input(deleteSourceSchema)
        .mutation(async ({ input, ctx }) => {
            const [deletedSource] = await ctx.project.db
                .delete(sources)
                .where(eq(sources.id, input.id))
                .returning();
            if (!deletedSource) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to delete source",
                });
            }
            return deletedSource;
        }),
    getPhaseComponents: projectProcedure
        .input(getPhaseComponentsSchema)
        .query(async ({ input, ctx }) => {
            const [source] = await ctx.project.db
                .select()
                .from(sources)
                .where(eq(sources.id, input.id));
            if (!source) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Source not found",
                });
            }
            const sequenceComponents = calculateZSequenceComponents(source);

            const phaseMatrix = calculateZPhaseComponents(sequenceComponents);

            const z0 = {
                re: sequenceComponents.z0.re,
                im: sequenceComponents.z0.im,
            };

            const z1 = {
                re: sequenceComponents.z1.re,
                im: sequenceComponents.z1.im,
            };

            return { z0, z1, z2: z1, phaseMatrix };
        }),
});
