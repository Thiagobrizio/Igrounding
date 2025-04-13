import { relations } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { towerGeometries } from "./towerGeometries";

export const conductorLocations = sqliteTable("conductor_locations", {
    id: integer("id").notNull().primaryKey({ autoIncrement: true }),
    x: real("x").notNull(),
    y: real("y").notNull(),
    geometryId: text("tower_geometry_id")
        .notNull()
        .references(() => towerGeometries.id),
});

export type ConductorLocation = typeof conductorLocations.$inferSelect;
export type NewConductorLocation = typeof conductorLocations.$inferInsert;

export const conductorLocationsRelations = relations(
    conductorLocations,
    ({ one }) => {
        return {
            towerGeometry: one(towerGeometries, {
                fields: [conductorLocations.geometryId],
                references: [towerGeometries.id],
            }),
        };
    }
);
