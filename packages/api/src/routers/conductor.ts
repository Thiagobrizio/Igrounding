import { eq, inArray } from "@repo/db/drizzle";
import { transmissionConductors } from "@repo/db/project/transmissionConductors";
import { conductorTypes } from "@repo/db/schemas/conductorTypes";
import {
    createConductorSchema,
    deleteConductorSchema,
    deleteManyConductorsSchema,
    generateConductorsSchema,
    getAllConductorsByLineIdSchema,
    getConductorByIdSchema,
    updateConductorSchema,
} from "@repo/validators/schemas/Conductor.schema";
import { TRPCError } from "@trpc/server";

import generateConductors from "../helpers/generateConductors";
import { projectProcedure, router } from "../trpc";

export default router({
    getAll: projectProcedure
        .input(getAllConductorsByLineIdSchema)
        .query(async ({ ctx, input }) => {
            const conductors = await ctx.project.db
                .select()
                .from(transmissionConductors)
                .where(eq(transmissionConductors.lineId, input.lineId));
            const result = [];
            for await (const [index, conductor] of conductors.entries()) {
                const [type] = await ctx.db
                    .select()
                    .from(conductorTypes)
                    .where(eq(conductorTypes.id, conductor.typeId));
                if (!type) {
                    throw new TRPCError({
                        code: "NOT_FOUND",
                        message: "Can't find Conductor Type",
                    });
                }
                result.push({
                    number: index + 1,
                    ...conductor,
                    type,
                });
            }
            return result;
        }),
    getById: projectProcedure
        .input(getConductorByIdSchema)
        .query(async ({ input, ctx }) => {
            const [conductor] = await ctx.project.db
                .select()
                .from(transmissionConductors)
                .where(eq(transmissionConductors.id, input.id));

            if (!conductor) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Conductor",
                });
            }
            const [geometry] = await ctx.db
                .select()
                .from(conductorTypes)
                .where(eq(conductorTypes.id, conductor.typeId));
            return { ...conductor, geometry };
        }),
    create: projectProcedure
        .input(createConductorSchema)
        .mutation(async ({ input, ctx }) => {
            const [newConductor] = await ctx.project.db
                .insert(transmissionConductors)
                .values(input)
                .returning();

            if (!newConductor) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Conductor",
                });
            }

            return newConductor;
        }),
    generate: projectProcedure
        .input(generateConductorsSchema)
        .mutation(async ({ input, ctx }) => {
            const conductors = generateConductors(input);
            const newConductors = await ctx.project.db
                .insert(transmissionConductors)
                .values(conductors)
                .returning();
            return newConductors;
        }),
    update: projectProcedure
        .input(updateConductorSchema)
        .mutation(async ({ input, ctx }) => {
            const [updatedConductor] = await ctx.project.db
                .update(transmissionConductors)
                .set(input)
                .where(eq(transmissionConductors.id, input.id))
                .returning();

            if (!updatedConductor) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Conductor",
                });
            }

            return updatedConductor;
        }),
    delete: projectProcedure
        .input(deleteConductorSchema)
        .mutation(async ({ input, ctx }) => {
            const [deletedConductor] = await ctx.project.db
                .delete(transmissionConductors)
                .where(eq(transmissionConductors.id, input.id))
                .returning();

            if (!deletedConductor) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Conductor",
                });
            }

            return deletedConductor;
        }),
    deleteMany: projectProcedure
        .input(deleteManyConductorsSchema)
        .mutation(async ({ input, ctx }) => {
            const [deletedConductor] = await ctx.project.db
                .delete(transmissionConductors)
                .where(inArray(transmissionConductors.id, input))
                .returning();

            if (!deletedConductor) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Can't find Conductor",
                });
            }

            return deletedConductor;
        }),
});
