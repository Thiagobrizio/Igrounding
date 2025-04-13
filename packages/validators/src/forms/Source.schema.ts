import { z } from "zod";

// create / update

export const sourceFormSchema = z.object({
    name: z
        .string()
        .min(3, {
            message: "Name must be at least 3 character(s)",
        })
        .max(50)
        .trim(),
    phases: z.coerce
        .number()
        .int({ message: "Please provide an integer value" })
        .min(1)
        .max(10),
    voltage: z.coerce.number().positive(),
    x1r1: z.coerce.number().min(0),
    x0r0: z.coerce.number().min(0),
    isc3: z.coerce.number().min(0),
    isc1: z.coerce.number().min(0),
    resistance: z.coerce.number().positive(),
    frequency: z.coerce.number().positive(),
});

export type SourceFormInput = z.infer<typeof sourceFormSchema>;

export const defaultSource: SourceFormInput = {
    name: "",
    phases: 3,
    voltage: 138,
    x1r1: 4,
    isc1: 4000,
    isc3: 3000,
    x0r0: 3,
    resistance: 15,
    frequency: 60,
};
