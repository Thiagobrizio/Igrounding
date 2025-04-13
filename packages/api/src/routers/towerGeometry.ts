import { eq } from "@repo/db/drizzle";
import { conductorLocations } from "@repo/db/schemas/conductorLocations";
import { towerGeometries } from "@repo/db/schemas/towerGeometries";
import {
    createTowerGeometrySchema,
    deleteTowerGeometrySchema,
    getAllTowerGeometriesSchema,
    getTowerGeometryByIdSchema,
    updateTowerGeometrySchema,
} from "@repo/validators/schemas/TowerGeometry.schema";

import { publicProcedure, router } from "../trpc";

export default router({
    getAll: publicProcedure
        .input(getAllTowerGeometriesSchema)
        .query(async ({ ctx: { db } }) => {
            const allTowerGeometries = await db.select().from(towerGeometries);
            return allTowerGeometries;
        }),
    getById: publicProcedure
        .input(getTowerGeometryByIdSchema)
        .query(async ({ input, ctx: { db } }) => {
            const [towerGeometry] = await db
                .select()
                .from(towerGeometries)
                .where(eq(towerGeometries.id, input.id));

            if (!towerGeometry) {
                throw new Error("Can't find tower geometry");
            }

            return towerGeometry;
        }),
    create: publicProcedure
        .input(createTowerGeometrySchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [newTowerGeometry] = await db
                .insert(towerGeometries)
                .values(input)
                .returning();

            if (!newTowerGeometry) {
                throw new Error("Failed to create a new Tower Geometry");
            }

            return newTowerGeometry;
        }),
    update: publicProcedure
        .input(updateTowerGeometrySchema)
        .mutation(async ({ input, ctx: { db } }) => {
            const [updatedTowerGeometry] = await db
                .update(towerGeometries)
                .set(input)
                .where(eq(towerGeometries.id, input.id))
                .returning();

            if (!updatedTowerGeometry) {
                throw new Error("Can't update tower geometry");
            }

            return updatedTowerGeometry;
        }),
    delete: publicProcedure
        .input(deleteTowerGeometrySchema)
        .mutation(async ({ input, ctx: { db } }) => {
            return db.transaction((tx) => {
                tx.delete(conductorLocations)
                    .where(eq(conductorLocations.geometryId, input.id))
                    .run();
                const deletedTowerGeometry = tx
                    .delete(towerGeometries)
                    .where(eq(towerGeometries.id, input.id))
                    .returning()
                    .get();

                if (!deletedTowerGeometry) {
                    tx.rollback();
                    throw new Error("Can't delete tower geometry");
                }

                return deletedTowerGeometry;
            });
        }),
});
