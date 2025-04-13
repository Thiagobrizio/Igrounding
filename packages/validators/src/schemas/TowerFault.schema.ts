import { z } from "zod";

import { lineId, towerId } from "../Ids.schema";

export const faultLocation = z.object({
    transmissionLine: lineId,
    tower: towerId,
});

export const towerFaultSchema = z.object({
    location: faultLocation,
});

export type FaultLocation = z.infer<typeof faultLocation>;

export type TowerFaultInput = z.infer<typeof towerFaultSchema>;
