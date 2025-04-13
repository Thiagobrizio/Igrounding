import { eq } from "@repo/db/drizzle";
import { conductorLocations } from "@repo/db/schemas/conductorLocations";
import {
    createConductorLocationSchema,
    deleteConductorLocationSchema,
    getAllConductorLocationsByGeometryIdSchema,
    getAllConductorLocationsSchema,
    getConductorLocationByIdSchema,
    updateConductorLocationSchema,
} from "@repo/validators/schemas/ConductorLocation.schema";

import { publicProcedure, router } from "../trpc";

export default router({
    getAll: publicProcedure
        .input(getAllConductorLocationsSchema)
        .query(async ({ ctx: { db } }) => {
            const allConductorLocations =
                await db.query.conductorLocations.findMany();

            const result = [];
            for await (const [
                index,
                conductorLocation,
            ] of allConductorLocations.entries()) {
                result.push({
                    number: index + 1,
                    ...conductorLocation,
                });
            }

            return result;
        }),
    getAllByGeometryId: publicProcedure
        .input(getAllConductorLocationsByGeometryIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const towers = await db.query.conductorLocations.findMany({
                where: eq(conductorLocations.geometryId, input.geometryId),
            });

            if (!towers) {
                throw new Error("Can't find transmission conductors");
            }
            const minOrder = Math.min(...towers.map((tower) => tower.id));
            return towers.map((tower) => ({
                number: tower.id - minOrder + 1,
                id: tower.id,
                x: tower.x,
                y: tower.y,
                geometryId: tower.geometryId,
            }));
        }),
    getById: publicProcedure
        .input(getConductorLocationByIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const conductorType = await db.query.conductorLocations.findFirst({
                where: eq(conductorLocations.id, input.locationId),
            });

            if (!conductorType) {
                throw new Error("Can't find conductor");
            }

            return conductorType;
        }),

    create: publicProcedure
        .input(createConductorLocationSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [newConductor] = await db
                .insert(conductorLocations)
                .values(input)
                .returning();

            if (!newConductor) {
                throw new Error("Can't create conductor");
            }

            return newConductor;
        }),
    // generate: publicProcedure
    //     .input(generateConductorLocationsSchema)
    //     .mutation(async ({ input, ctx: { db } }) => {
    //         // const conductors = generateConductors(input);
    //         // const createdConductors = await db
    //         //     .insert(conductorLocations)
    //         //     .values(conductors)
    //         //     .returning();
    //         // return createdConductors;
    //     }),
    update: publicProcedure
        .input(updateConductorLocationSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [updatedConductor] = await db
                .update(conductorLocations)
                .set(input)
                .where(eq(conductorLocations.id, input.id))
                .returning();

            if (!updatedConductor) {
                throw new Error("Can't update conductor");
            }

            return updatedConductor;
        }),
    delete: publicProcedure
        .input(deleteConductorLocationSchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [deletedConductor] = await db
                .delete(conductorLocations)
                .where(eq(conductorLocations.id, input.locationId))
                .returning();

            if (!deletedConductor) {
                throw new Error("Can't delete conductor");
            }

            return deletedConductor;
        }),
});
