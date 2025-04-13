import type { RouterOutputs } from "~/utils/trpc";

export type ConductorLocation =
    RouterOutputs["conductorLocations"]["getAll"][number];
