import { z } from "zod";

import { geometryId } from "../Ids.schema";

// create / update

export const transmissionTowerFormSchema = z.object({
    name: z.string().min(2).max(50).trim(),
    resistance: z.coerce.number(),
    distance: z.coerce.number(),
    geometryId,
});

export type TransmissionTowerFormInput = z.infer<
    typeof transmissionTowerFormSchema
>;

export const defaultTransmissionTower: TransmissionTowerFormInput = {
    name: "",
    resistance: 15,
    distance: 1,
    geometryId: "",
};

// generate

export const generateTowersFormSchema = z.object({
    namePrefix: z.string().min(1),
    numTowers: z.coerce.number().positive(),
    resistance: z.coerce.number().positive(),
    distance: z.coerce.number().positive(),
    geometryId,
});

export type GenerateTowersFormInput = z.infer<typeof generateTowersFormSchema>;

export const defaultGenerateTowers: GenerateTowersFormInput = {
    namePrefix: "T",
    geometryId: "",
    numTowers: 10,
    resistance: 15,
    distance: 10,
};
