import { z } from "zod";

// create / update

export const towerGeometryFormSchema = z.object({
    name: z.string().min(2).max(50).trim(),
});

export type TowerGeometryFormInput = z.infer<typeof towerGeometryFormSchema>;

export const defaultTowerGeometry: TowerGeometryFormInput = {
    name: "",
};
