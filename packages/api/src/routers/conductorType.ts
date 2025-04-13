import { count, eq } from "@repo/db/drizzle";
import { conductorTypes } from "@repo/db/schemas/conductorTypes";
import {
    createConductorTypeSchema,
    deleteConductorTypeSchema,
    getAllConductorTypesSchema,
    getConductorTypeByIdSchema,
    updateConductorTypeSchema,
} from "@repo/validators/schemas/ConductorType.schema";

import { publicProcedure, router } from "../trpc";

export default router({
    getAll: publicProcedure
        .input(getAllConductorTypesSchema)
        .query(async ({ ctx: { db } }) => {
            const allConductorTypes = await db.query.conductorTypes.findMany();

            return allConductorTypes;
        }),
    getCount: publicProcedure
        .input(getAllConductorTypesSchema)
        .query(async ({ ctx: { db }, input }) => {
            const [totalCount] = await db
                .select({
                    value: count(),
                })
                .from(conductorTypes);

            if (!totalCount) {
                throw new Error("Could not get totalCount");
            }
            const pageCount = input
                ? Math.ceil(totalCount.value / input.pageSize)
                : -1;

            return pageCount;
        }),
    getById: publicProcedure
        .input(getConductorTypeByIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const conductorType = await db.query.conductorTypes.findFirst({
                where: eq(conductorTypes.id, input.id),
            });

            if (!conductorType) {
                throw new Error("Can't find conductor type");
            }

            return conductorType;
        }),
    create: publicProcedure
        .input(createConductorTypeSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [newConductorType] = await db
                .insert(conductorTypes)
                .values(input)
                .returning();

            if (!newConductorType) {
                throw new Error("Can't create conductor type");
            }

            return newConductorType;
        }),
    update: publicProcedure
        .input(updateConductorTypeSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [updatedConductorType] = await db
                .update(conductorTypes)
                .set(input)
                .where(eq(conductorTypes.id, input.id))
                .returning();

            if (!updatedConductorType) {
                throw new Error("Can't update conductor type");
            }

            return updatedConductorType;
        }),
    delete: publicProcedure
        .input(deleteConductorTypeSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [deletedConductor] = await db
                .delete(conductorTypes)
                .where(eq(conductorTypes.id, input.id))
                .returning();

            if (!deletedConductor) {
                throw new Error("Can't update conductor type");
            }

            return deletedConductor;
        }),
});
