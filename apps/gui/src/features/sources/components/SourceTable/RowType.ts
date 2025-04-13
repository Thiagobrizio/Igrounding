import type { RouterOutputs } from "~/utils/trpc";

export type Source = RouterOutputs["source"]["getAll"][number];
