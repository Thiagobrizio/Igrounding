import { z } from "zod";

import { sourceId, towerId } from "../Ids.schema";

export const solveSolutionSchema = z.object({
    towerId: z.union([towerId, z.literal("")]),
    sourceId: z.union([sourceId, z.literal("")]),
});
