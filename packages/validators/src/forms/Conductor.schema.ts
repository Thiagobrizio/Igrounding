import { z } from "zod";

import { conductorTypeId } from "../Ids.schema";

// create / update

export const conductorFormSchema = z.object({
    name: z
        .string()
        .min(3, {
            message: "Name must contain at least 3 characters.",
        })
        .max(50)
        .trim(),
    fromPhase: z.coerce.number().nonnegative(),
    toPhase: z.coerce.number().nonnegative(),
    bundleNumber: z.coerce.number().min(1),
    bundleSpacing: z.coerce.number().nonnegative(),
    isNeutral: z.boolean(),
    typeId: conductorTypeId,
});

export type ConductorFormInput = z.infer<typeof conductorFormSchema>;

export const defaultConductor: ConductorFormInput = {
    name: "",
    fromPhase: 0,
    toPhase: 0,
    isNeutral: false,
    bundleNumber: 1,
    bundleSpacing: 0,
    typeId: "",
};

// generate conductors

export const generateConductorsFormSchema = z.object({
    phases: z.coerce.number().positive(),
    circuits: z.coerce.number().positive(),
    neutrals: z.coerce.number().positive(),
    phaseTypeId: conductorTypeId,
    neutralTypeId: conductorTypeId,
});

export type GenerateConductorsFormInput = z.infer<
    typeof generateConductorsFormSchema
>;

export const defaultGenerateFormConductors: GenerateConductorsFormInput = {
    phaseTypeId: "",
    neutralTypeId: "",
    phases: 3,
    circuits: 2,
    neutrals: 2,
};
