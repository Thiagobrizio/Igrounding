import { z } from "zod";

import { baseElementSchema, baseOpenDSSElementSchema } from "./baseElement";
import { unitsSchema } from "./enums";

export const lineSpacingSchema = baseElementSchema.extend({
    nConds: z.number().optional(),
    nPhases: z.number().optional(),
    x: z.number().array().optional(),
    h: z.number().array().optional(),
    units: unitsSchema.optional(),
});

export type LineSpacingParameters = z.infer<typeof lineSpacingSchema>;

export const opendssLineSpacingSchema = baseOpenDSSElementSchema.extend({
    nConds: z.string().optional(),
    nPhases: z.string().optional(),
    x: z.string().optional(),
    h: z.string().optional(),
    units: unitsSchema.optional(),
});

export type OpenDSSLineSpacingParameters = z.infer<
    typeof opendssLineSpacingSchema
>;
