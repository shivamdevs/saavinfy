"use client";

import { MediaSong } from "@/types/media";
import React from "react";
import LibraryCard from "./card";
import useLibrary from "@/contexts/library";
import ScreenOffset from "@/components/layout/screen";
import SongList from "@/components/tokens/list";
import { formatDateAndTime } from "@/lib/utils";

export type FavoriteClientProps = {
    songs: MediaSong[];
};

function FavoriteClient({ songs }: FavoriteClientProps) {
    const library = useLibrary();

    return (
        <>
            <LibraryCard
                title="Favorites"
                songs={songs}
                image={"/images/favorites.jpg"}
                date={library.favorites.date}
            />
            <ScreenOffset className="py-10 px-2">
                <SongList
                    className="top-16"
                    replaceAlbum={(song) => {
                        return formatDateAndTime(
                            library.favorites.songs.find(
                                (s) => s.id === song.id
                            )?.date ?? Date.now()
                        );
                    }}
                    items={songs.sort(
                        (a, b) =>
                            (library.favorites.songs.find((s) => s.id === b.id)
                                ?.date ?? Date.now()) -
                            (library.favorites.songs.find((s) => s.id === a.id)
                                ?.date ?? Date.now())
                    )}
                    noHeader
                />
            </ScreenOffset>
        </>
    );
}

export default FavoriteClient;
