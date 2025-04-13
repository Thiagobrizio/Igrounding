import { z } from "zod";

// create / update

export const projectFormSchema = z.object({
    name: z
        .string()
        .min(3, {
            message: "Name must be at least 3 character(s)",
        })
        .max(100),
});

export type ProjectFormInput = z.infer<typeof projectFormSchema>;

export const defaultProject: ProjectFormInput = {
    name: "",
};
