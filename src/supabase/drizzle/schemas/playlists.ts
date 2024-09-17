import {
    boolean,
    pgTable,
    serial,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { Users } from "./users";
import { relations } from "drizzle-orm";
import { PlaylistSongs } from "./playlist-songs";

export const Playlists = pgTable("playlists", {
    uid: serial("uid").unique().notNull(),
    id: uuid("id").primaryKey().unique().notNull().defaultRandom(),

    userId: uuid("user_id")
        .notNull()
        .references(() => Users.id),

    name: varchar("name").notNull(),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    modifiedAt: timestamp("modified_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),

    isFavorite: boolean("is_favorite").notNull().default(false),
    isPublic: boolean("is_public").notNull().default(false),
});

export const PlaylistsRelations = relations(Playlists, ({ many, one }) => ({
    user: one(Users, {
        fields: [Playlists.userId],
        references: [Users.id],
    }),
    songs: many(PlaylistSongs, {
        relationName: "playlist-songs",
    }),
}));
