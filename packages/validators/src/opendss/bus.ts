import { z } from "zod";

export const busSchema = z.object({
    name: z.string(),
    phases: z.number().array(),
});

export type Bus = z.infer<typeof busSchema>;
