import { z } from "zod";

import { sourceId } from "../Ids.schema";

// create / update

export const transmissionLineFormSchema = z.object({
    name: z
        .string()
        .min(3, {
            message: "Name must be at least 3 character(s)",
        })
        .max(50)
        .trim(),
    fromSourceId: sourceId,
    toSourceId: sourceId,
});

export type TransmissionLineFormInput = z.infer<
    typeof transmissionLineFormSchema
>;

export const defaultTransmissionLine: TransmissionLineFormInput = {
    name: "",
    fromSourceId: "",
    toSourceId: "",
};
