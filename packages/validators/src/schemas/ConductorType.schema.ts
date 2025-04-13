import { z } from "zod";

import { conductorTypeId } from "../Ids.schema";

// create

export const createConductorTypeSchema = z.object({
    name: z.string().min(2),
    surfaceArea: z.number().positive(),
    stranding: z.string(),
    outerDiameter: z.number().positive(),
    coreDiameter: z.number().positive(),
    layers: z.number(),
    currentCapacity: z.number().positive(),
    dcResistance25: z.number().positive(),
    acResistance25: z.number().positive(),
    acResistance50: z.number().positive(),
    acResistance75: z.number().positive(),
    gmr: z.number().positive(),
});

export type CreateConductorTypeInput = z.infer<
    typeof createConductorTypeSchema
>;

// update

export const updateConductorTypeSchema = createConductorTypeSchema.extend({
    id: conductorTypeId,
});

export type UpdateConductorTypeInput = z.infer<
    typeof updateConductorTypeSchema
>;

// getAll

export const getAllConductorTypesSchema = z
    .object({
        pageIndex: z.number(),
        pageSize: z.number(),
    })
    .optional();

export type GetAllConductorTypesInput = z.infer<
    typeof getAllConductorTypesSchema
>;

// getById

export const getConductorTypeByIdSchema = z.object({ id: conductorTypeId });

export type GetConductorTypeByIdInput = z.infer<
    typeof getConductorTypeByIdSchema
>;

// delete

export const deleteConductorTypeSchema = z.object({ id: conductorTypeId });

export type DeleteConductorTypeInput = z.infer<
    typeof deleteConductorTypeSchema
>;
