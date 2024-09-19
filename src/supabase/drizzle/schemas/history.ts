import {
    integer,
    pgTable,
    serial,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { Users } from "./users";
import { relations, sql } from "drizzle-orm";

export const History = pgTable("history", {
    uid: serial("uid").unique().notNull(),
    id: uuid("id").primaryKey().unique().notNull().defaultRandom(),

    userId: uuid("user_id")
        .notNull()
        .references(() => Users.id),

    song: varchar("song", {
        length: 8,
    }).notNull(),

    createdAt: timestamp("created_at", {
        mode: "date",
    })
        .notNull()
        .defaultNow(),

    lastPlayedAt: timestamp("last_played_at", {
        mode: "date",
    })
        .notNull()
        .defaultNow(),
    removedAt: timestamp("removed_at", {
        mode: "date",
    }),

    frequency: integer("frequency")
        .notNull()
        .default(1)
        .$onUpdateFn(() => sql`frequency + 1`),
});

export const HistoryRelations = relations(History, ({ one }) => ({
    user: one(Users, {
        fields: [History.userId],
        references: [Users.id],
    }),
}));
