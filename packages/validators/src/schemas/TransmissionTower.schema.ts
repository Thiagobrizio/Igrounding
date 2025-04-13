import { z } from "zod";

import { geometryId, lineId, towerId } from "../Ids.schema";

// create

export const createTransmissionTowerSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    resistance: z.number(),
    distance: z.number(),
    lineId,
    geometryId,
});

export type CreateTransmissionTowerInput = z.infer<
    typeof createTransmissionTowerSchema
>;

// getAllTowersByLineId

export const getTowersByLineIdSchema = z.object({
    lineId,
});

// getTowerByIdSchema

export const getTowerByIdSchema = z.object({
    id: towerId,
});
export type GetTowerByIdInput = z.infer<typeof getTowerByIdSchema>;

// update

export const updateTransmissionTowerSchema = createTransmissionTowerSchema
    .omit({ lineId: true })
    .extend({
        id: towerId,
    });

export type UpdateTransmissionTowerInput = z.infer<
    typeof updateTransmissionTowerSchema
>;

// generate

export const generateTowersSchema = z.object({
    namePrefix: z.string().min(1),
    numTowers: z.number().positive(),
    resistance: z.number().positive(),
    distance: z.number().positive(),
    geometryId,
    lineId,
});

export type GenerateTowersInput = z.infer<typeof generateTowersSchema>;

// getTowerParameters

export const getTowerParametersSchema = z.object({
    towerId,
});

export type GetTowerParametersInput = z.infer<typeof getTowerParametersSchema>;

// delete

export const deleteTransmissionTowerSchema = z.object({
    id: towerId,
});

export type DeleteTransmissionTowerInput = z.infer<
    typeof deleteTransmissionTowerSchema
>;

// delete Many

export const deleteManyTransmissionTowersSchema = z.array(towerId);

export type DeleteManyTransmissionTowersInput = z.infer<
    typeof deleteManyTransmissionTowersSchema
>;
