import { randomUUID } from "crypto";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const sources = sqliteTable("sources", {
    id: text()
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    name: text().notNull(),
    phases: integer().notNull(),
    voltage: integer().notNull(),
    x1r1: real().notNull(),
    x0r0: real().notNull(),
    isc3: integer().notNull(),
    isc1: integer().notNull(),
    resistance: real().notNull(),
    frequency: integer().notNull(),
    enabled: integer({ mode: "boolean" }).notNull(),
    x: real().notNull().default(0),
    y: real().notNull().default(0),
});

export type Source = typeof sources.$inferSelect;
export type NewSource = typeof sources.$inferInsert;
