import { z } from "zod";

import { sourceId } from "../Ids.schema";

// create

export const createSourceSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    phases: z
        .number({
            invalid_type_error: "Please enter a number",
        })
        .int({ message: "Please provide an integer value" })
        .min(0)
        .max(10),
    voltage: z.number().positive(),
    x1r1: z.number().min(0),
    x0r0: z.number().min(0),
    isc3: z.number().min(0),
    isc1: z.number().min(0),
    resistance: z.number().positive(),
    frequency: z.number().positive(),
});

export type CreateSourceInput = z.infer<typeof createSourceSchema>;

// update positions

export const updateSourcePositionsSchema = z
    .object({
        id: sourceId,
        x: z.number(),
        y: z.number(),
    })
    .array();

export type UpdateSourcePositionsInput = z.infer<
    typeof updateSourcePositionsSchema
>;

// update

export const updateSourceSchema = createSourceSchema.extend({
    id: sourceId,
});

export type UpdateSourceGeneralInput = z.infer<typeof updateSourceSchema>;

// getAllSources

export const getAllSourcesSchema = z.object({});

export type GetAllSourcesInput = z.infer<typeof getAllSourcesSchema>;

// getById

export const getSourceByIdSchema = z.object({ id: sourceId });

export type GetSourceByIdInput = z.infer<typeof getSourceByIdSchema>;

// delete

export const deleteSourceSchema = z.object({ id: sourceId });

export type DeleteSourceInput = z.infer<typeof deleteSourceSchema>;

// getPhaseComponents

export const getPhaseComponentsSchema = z.object({ id: sourceId });

export type GetPhaseComponentsInput = z.infer<typeof getPhaseComponentsSchema>;
