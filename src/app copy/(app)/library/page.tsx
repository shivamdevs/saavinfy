import { Endpoints } from "@/config/endpoints";
import { serverCall } from "@/lib/call";
import { MediaSong } from "@/types/media";
import React from "react";
import { getLibraryData } from "../server";
import FavoriteClient from "./client";

async function getLibraryFavoritesSongs() {
    const library = getLibraryData();

    if (!library) {
        return null;
    }

    if (!library.favorites.songs.length) {
        return null;
    }

    return await serverCall<MediaSong[]>(
        Endpoints.songsByIds(library.favorites.songs.map((s) => s.id))
    );
}

export default async function Page() {
    const songs = await getLibraryFavoritesSongs();

    if (!songs || !songs.success) {
        return null;
    }

    if (!songs.data || !songs.data || !songs.data.length) {
        return null;
    }

    return <FavoriteClient songs={songs.data} />;
}
