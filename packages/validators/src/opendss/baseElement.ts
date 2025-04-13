import { z } from "zod";

export const baseElementSchema = z.object({
    name: z.string(),
});

export type BaseElementInput = z.infer<typeof baseElementSchema>;

export const baseOpenDSSElementSchema = z.object({
    name: z.string(),
});

export type BaseOpenDSSElement = z.infer<typeof baseOpenDSSElementSchema>;
