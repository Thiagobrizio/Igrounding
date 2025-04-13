import { randomUUID } from "crypto";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// import { towerGeometries } from "./towerGeometries";
import { transmissionLines } from "./transmissionLines";

export const transmissionTowers = sqliteTable("transmission_towers", {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    name: text().notNull(),
    resistance: integer().notNull(),
    distance: integer().notNull(),
    geometryId: text().notNull(),
    // .references(() => towerGeometries.id),
    lineId: text()
        .notNull()
        .references(() => transmissionLines.id),
});

export type TransmissionTower = typeof transmissionTowers.$inferSelect;
export type NewTransmissionTower = typeof transmissionTowers.$inferInsert;
