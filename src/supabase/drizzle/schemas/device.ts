import { uuidV4 } from "@/lib/utils";
import { sql } from "drizzle-orm";
import {
    bigserial,
    pgTable,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

export const DeviceSchema = pgTable("Devices", {
    id: bigserial("id", {
        mode: "number",
    })
        .unique()
        .notNull()
        .primaryKey(),

    uuid: uuid("uuid").unique().notNull().defaultRandom(),

    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date",
    })
        .notNull()
        .defaultNow(),

    lastUpdatedAt: timestamp("last_updated_at", {
        withTimezone: true,
        mode: "date",
    })
        .notNull()
        .defaultNow()
        .$onUpdateFn(() => sql`current_timestamp at time zone 'utc'`),

    name: varchar("name", {
        length: 100,
    })
        .notNull()
        .$defaultFn(() => uuidV4(100)),
});
