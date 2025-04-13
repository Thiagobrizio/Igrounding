import { z } from "zod";

import { lineId, sourceId } from "../Ids.schema";

// create

export const createTransmissionLineSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    fromSourceId: sourceId,
    toSourceId: sourceId,
});

export type CreateTransmissionLineInput = z.infer<
    typeof createTransmissionLineSchema
>;

// update

export const updateTransmissionLineSchema = createTransmissionLineSchema.extend(
    {
        id: lineId,
    }
);

export type UpdateTransmissionLineInput = z.infer<
    typeof updateTransmissionLineSchema
>;

// getAllTransmissionLines

export const getAllTransmissionLinesSchema = z.object({});

export type GetAllTransmissionLinesInput = z.infer<
    typeof getAllTransmissionLinesSchema
>;

// getById

export const getTransmissionLineByIdSchema = z.object({
    id: lineId,
});

export type GetTransmissionLineByIdInput = z.infer<
    typeof getTransmissionLineByIdSchema
>;

// delete

export const deleteTransmissionLineSchema = z.object({ id: lineId });

export type DeleteTransmissionLineInput = z.infer<
    typeof deleteTransmissionLineSchema
>;

// getTransmissionLineParametersSchema
export const getTransmissionLineParametersSchema = z.object({ id: lineId });

export type GetTransmissionLineParametersInput = z.infer<
    typeof getTransmissionLineParametersSchema
>;
