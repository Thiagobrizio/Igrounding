import { z } from "zod";

// create / update

export const conductorLocationFormSchema = z.object({
    x: z.coerce.number(),
    y: z.coerce.number().positive(),
});

export type ConductorLocationFormInput = z.infer<
    typeof conductorLocationFormSchema
>;

export const defaultConductorLocation: ConductorLocationFormInput = {
    x: 0,
    y: 0,
};
