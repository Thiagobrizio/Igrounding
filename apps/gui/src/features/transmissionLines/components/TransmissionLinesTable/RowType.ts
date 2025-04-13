import type { RouterOutputs } from "~/utils/trpc";

export type TransmissionLine =
    RouterOutputs["transmissionLine"]["getAll"][number];
