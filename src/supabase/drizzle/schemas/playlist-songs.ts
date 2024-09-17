import { pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { Playlists } from "./playlists";
import { relations } from "drizzle-orm";

export const PlaylistSongs = pgTable("playlist_songs", {
    uid: serial("uid").unique().notNull(),
    id: uuid("id").primaryKey().unique().notNull().defaultRandom(),

    song: varchar("song", {
        length: 8,
    }).notNull(),

    playlistId: uuid("playlist")
        .notNull()
        .references(() => Playlists.id),

    createdAt: timestamp("created_at").notNull().defaultNow(),
    removedAt: timestamp("removed_at"),
});

export const PlaylistSongsRelations = relations(PlaylistSongs, ({ one }) => ({
    playlist: one(Playlists, {
        fields: [PlaylistSongs.playlistId],
        references: [Playlists.id],
        relationName: "playlist-songs",
    }),
}));
