import { relations } from "drizzle-orm";
import { bigserial, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const UserSchema = pgTable("Users", {
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
        .defaultNow(),

    mergedWith: bigserial("merged_with", {
        mode: "number",
    }),
});

export const UserRelations = relations(UserSchema, ({ many, one }) => ({
    mergedTo: one(UserSchema, {
        fields: [UserSchema.mergedWith],
        references: [UserSchema.id],
    }),

    merges: many(UserSchema),
}));
