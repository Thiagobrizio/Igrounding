import type { RouterOutputs } from "~/utils/trpc";

export type Conductor = RouterOutputs["conductor"]["getAll"][number];
