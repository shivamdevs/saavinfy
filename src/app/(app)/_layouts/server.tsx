"use server";

import React from "react";
import { cookies } from "next/headers";

import ServerBox from "@/components/layout/server";

import { PlayerProvider } from "@/contexts/player";
import { LibraryProvider } from "@/contexts/library";

import Saves from "@/helpers/saves";
import Saavn from "@/helpers/saavn";
import SupabaseServerClient from "@/supabase/server";
import db from "@/supabase/drizzle";
import { LibraryData } from "@/types/saves";

export default async function ServerLayout({
    children,
}: React.PropsWithChildren) {
    const playerSave = Saves.getPlayer(cookies);
    const librarySave = Saves.getLibrary(cookies);

    const playlists = await getPlaylists();

    const libData: LibraryData = {
        searches: librarySave.searches,
        favorites: playlists?.favorites ?? null,
        playlists: playlists?.playlists || [],
    };

    const songs = await Saavn.getSongs(
        playerSave.queue.map((id) => id.toString())
    );

    if (songs.success) {
        playerSave.queue = songs.data;
    }

    return (
        <ServerBox data={songs}>
            <PlayerProvider data={playerSave}>
                <LibraryProvider data={libData}>{children}</LibraryProvider>
            </PlayerProvider>
        </ServerBox>
    );
}

async function getPlaylists() {
    const supabase = SupabaseServerClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        return null;
    }

    try {
        const playlists = await db.query.Playlists.findMany({
            where: (fields, operators) =>
                operators.and(
                    operators.eq(fields.userId, data.user.id),
                    operators.isNull(fields.deletedAt)
                ),
            columns: {
                deletedAt: false,
                uid: false,
                userId: false,
            },

            orderBy(fields, operators) {
                return [operators.desc(fields.createdAt)];
            },

            with: {
                songs: {
                    columns: {
                        removedAt: false,
                        uid: false,
                    },

                    where(fields, operators) {
                        return operators.isNull(fields.removedAt);
                    },

                    orderBy(fields, operators) {
                        return [operators.desc(fields.createdAt)];
                    },
                },
            },
        }).execute();

        return {
            favorites: playlists
                .filter((playlist) => playlist.isFavorite)
                .at(0)!,
            playlists: playlists.filter((playlist) => !playlist.isFavorite),
        };
    } catch (error) {
        console.error(error);

        return null;
    }
}
