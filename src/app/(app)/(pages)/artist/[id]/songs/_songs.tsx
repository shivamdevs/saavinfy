import React from "react";
import { MediaArtistSongs } from "@/types/media";
import { SongList } from "@/components/blocks/song";
import Paged from "@/components/ui/pagination";
import Parser from "@/helpers/parser";

export default function ArtistSongsPage({
    songs,
    page,
    artist,
}: {
    songs: MediaArtistSongs;
    page: number;
    artist: string;
}) {
    return (
        <div className="px-5 py-10">
            <h2 className="text-2xl font-semibold pl-2 my-4">
                {40 * page - 39} - {Math.min(40 * page, songs.total)} /{" "}
                {songs.total} {Parser.plural(songs.total, "Song")}
            </h2>
            <SongList items={songs.songs} />

            <span className="block h-8" />

            <Paged
                page={page * 30 - 29}
                total={songs.total}
                limit={30}
                href={(page) =>
                    `/artist/${artist}/songs${page === 1 ? "" : `/${page}`}`
                }
            />
        </div>
    );
}
