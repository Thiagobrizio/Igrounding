import { randomUUID } from "crypto";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { sources } from "./sources";

export const transmissionLines = sqliteTable("transmission_lines", {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    name: text().notNull(),
    fromSourceId: text()
        .notNull()
        .references(() => sources.id),
    toSourceId: text()
        .notNull()
        .references(() => sources.id),
});

export type TransmissionLine = typeof transmissionLines.$inferSelect;
export type NewTransmissionLine = typeof transmissionLines.$inferInsert;
