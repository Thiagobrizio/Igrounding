import { relations } from "drizzle-orm";
import { real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

import { conductorLayers } from "./conductorLayers";

export const conductorTypes = sqliteTable("conductor_types", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => uuidv4()),
    name: text("name").notNull(),
    surfaceArea: real("surface_area").notNull(),
    stranding: text("stranding").notNull(),
    outerDiameter: real("outer_diameter").notNull(),
    coreDiameter: real("core_diameter").notNull(),
    layers: real("layers").notNull(),
    currentCapacity: real("current_capacity").notNull(),
    dcResistance25: real("dc_resistance_25").notNull(),
    acResistance25: real("ac_resistance_25").notNull(),
    acResistance50: real("ac_resistance_50").notNull(),
    acResistance75: real("ac_resistance_75").notNull(),
    gmr: real("gmr").notNull(),
});

export type ConductorType = typeof conductorTypes.$inferSelect;
export type NewConductorType = typeof conductorTypes.$inferInsert;

export const conductorTypesRelations = relations(conductorTypes, ({ many }) => {
    return {
        layers: many(conductorLayers),
    };
});
