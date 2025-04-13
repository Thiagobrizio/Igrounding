import type { RouterOutputs } from "~/utils/trpc";

export type ConductorType = RouterOutputs["conductorType"]["getAll"][number];
