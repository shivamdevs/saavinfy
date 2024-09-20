import getPlaylistInfo from "@/app/api/_playlist";
import ServerBox from "@/components/layout/server";
import Saavn from "@/helpers/saavn";
import SupabaseServerClient from "@/supabase/server";
import { PageProps } from "@/types/args";
import { notFound } from "next/navigation";
import React from "react";
import LibraryPlaylist from "./_playlist";

export default async function Page({ params }: PageProps<{ id?: string }>) {
    if (!params.id) {
        return notFound();
    }

    const playlistInfo = await getPlaylistInfo(params.id);

    if (!playlistInfo || playlistInfo.error || !playlistInfo.data) {
        return notFound();
    }

    const playlist = playlistInfo.data;

    if (playlist.deletedAt) {
        return notFound();
    }

    const supabase = SupabaseServerClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data) {
        return notFound();
    }

    const { user } = data;

    if (
        (!playlist.isPublic || playlist.isFavorite) &&
        playlist.userId !== user.id
    ) {
        return notFound();
    }

    const songIds = playlistInfo.data.songs.map((s) => s.song);

    const result = await Saavn.getSongs(songIds);

    const songs = result.success && result.data;

    return (
        <ServerBox data={result}>
            {songs && (
                <LibraryPlaylist
                    user={user}
                    playlist={playlist}
                    songs={songs}
                />
            )}
        </ServerBox>
    );
}
