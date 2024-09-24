import React from "react";
import { MediaSong } from "@/types/media";
import BlockCard from "@/components/blocks/card";
import ArtistList from "../_components/artist";

export default function SongPage({ song }: { song: MediaSong }) {
    return (
        <BlockCard item={song} type="song">
            <div className="flex flex-col">
                <ArtistList artists={song.artists} />
            </div>
        </BlockCard>
    );
}
