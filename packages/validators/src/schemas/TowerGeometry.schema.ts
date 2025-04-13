import { z } from "zod";

import { geometryId } from "../Ids.schema";

// create

export const createTowerGeometrySchema = z.object({
    name: z.string().min(2).max(50).trim(),
});

export type CreateTowerGeometryInput = z.infer<
    typeof createTowerGeometrySchema
>;

// update

export const updateTowerGeometrySchema = createTowerGeometrySchema.extend({
    id: geometryId,
});

export type UpdateTowerGeometryInput = z.infer<
    typeof updateTowerGeometrySchema
>;

// getAllTowerGeometries

export const getAllTowerGeometriesSchema = z.object({}).optional();

export type GetAllTowerGeometriesInput = z.infer<
    typeof getAllTowerGeometriesSchema
>;

// getById

export const getTowerGeometryByIdSchema = z.object({ id: geometryId });

export type GetTowerGeometryByIdInput = z.infer<
    typeof getTowerGeometryByIdSchema
>;

// delete

export const deleteTowerGeometrySchema = z.object({ id: geometryId });

export type DeleteTowerGeometryInput = z.infer<
    typeof deleteTowerGeometrySchema
>;
