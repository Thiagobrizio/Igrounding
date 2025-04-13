import { randomUUID } from "crypto";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// import { conductorTypes } from "./conductorTypes";
import { transmissionLines } from "./transmissionLines";

export const transmissionConductors = sqliteTable("transmission_conductors", {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    name: text().notNull(),
    fromPhase: integer().notNull(),
    toPhase: integer().notNull(),
    bundleNumber: integer().notNull(),
    bundleSpacing: integer().notNull(),
    isNeutral: integer({ mode: "boolean" }).notNull(),
    typeId: text().notNull(),
    // .references(() => conductorTypes.id),
    lineId: text()
        .notNull()
        .references(() => transmissionLines.id),
});

export type TransmissionConductor = typeof transmissionConductors.$inferSelect;
export type NewTransmissionConductor =
    typeof transmissionConductors.$inferInsert;
