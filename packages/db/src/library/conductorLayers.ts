import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { conductorMaterials } from "./conductorMaterials";
import { conductorTypes } from "./conductorTypes";

export const conductorLayers = sqliteTable("conductor_layers", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    numFibres: integer("numFibres"),
    diameterFibre: real("diameterFibre"),
    materialTypeId: integer("materialTypeId")
        .notNull()
        .references(() => conductorMaterials.id),
    conductorTypeId: integer("conductorTypeId")
        .notNull()
        .references(() => conductorTypes.id),
});

export type ConductorLayer = typeof conductorLayers.$inferSelect;
export type NewConductorLayer = typeof conductorLayers.$inferInsert;
