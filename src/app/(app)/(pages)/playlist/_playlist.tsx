import React from "react";
import { MediaPlaylist } from "@/types/media";
import BlockCard from "@/components/blocks/card";
import { SongList } from "@/components/blocks/song";

export default function PlaylistPage({
    playlist,
}: {
    playlist: MediaPlaylist;
}) {
    return (
        <BlockCard item={playlist} type="playlist">
            <SongList items={playlist.songs} />
        </BlockCard>
    );
}
