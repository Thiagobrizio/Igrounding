import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const conductorMaterials = sqliteTable("conductor_materials", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    relativePermeability: real("relative_permeability"),
    relativePermittivity: real("relative_permittivity"),
});

export type ConductorMaterial = typeof conductorMaterials.$inferSelect;
export type NewConductorMaterial = typeof conductorMaterials.$inferInsert;
