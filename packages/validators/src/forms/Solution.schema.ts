import { z } from "zod";

import { sourceId, towerId } from "../Ids.schema";

// create / update

export const solutionFormSchema = z.object({
    towerId: z.union([towerId, z.literal("")]),
    sourceId: z.union([sourceId, z.literal("")]),
});

export type SolutionFormInput = z.infer<typeof solutionFormSchema>;

export const defaultSolution: SolutionFormInput = {
    towerId: "",
    sourceId: "",
};
