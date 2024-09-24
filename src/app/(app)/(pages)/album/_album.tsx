import React from "react";
import { MediaAlbum } from "@/types/media";
import BlockCard from "@/components/blocks/card";
import { SongList } from "@/components/blocks/song";
import Parser from "@/helpers/parser";
import ArtistList from "../_components/artist";

export default function AlbumPage({ album }: { album: MediaAlbum }) {
    return (
        <BlockCard item={album} type="album">
            <span className="block h-2" />
            <ArtistList artists={album.artists} />
            <h3 className="text-xl font-semibold mt-10 mb-4">
                {Parser.numeric(album.songCount)}{" "}
                {Parser.plural(album.songCount, "Song")}
            </h3>
            <SongList items={album.songs} />
            <span className="block h-10" />
        </BlockCard>
    );
}
