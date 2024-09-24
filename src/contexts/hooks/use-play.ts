import { SearchAlbum, SearchArtist, SearchPlaylist } from "@/types/search";
import usePlayer from "../player";
import React from "react";
import Saavn from "@/helpers/saavn";
import { Media, MediaInlineArtist } from "@/types/media";

export default function useFetchAndPlay() {
    const player = usePlayer();

    const song = React.useCallback(
        async (ids: string | string[], addToQueue: boolean = false) => {
            if (!ids) return;

            const res = await Saavn.getSongs(ids);

            if (!res.success || !res.data.length) {
                return;
            }

            player.addSongs(res.data, !addToQueue, !addToQueue);
        },
        [player]
    );

    const playlist = React.useCallback(
        async (
            playlist: SearchPlaylist | Media,
            addToQueue: boolean = false
        ) => {
            const res = await Saavn.playlist(playlist.id);

            if (!res.success || !res.data.songs.length) {
                return;
            }

            player.addSongs(res.data.songs, !addToQueue, !addToQueue);
        },
        [player]
    );

    const artistSongs = React.useCallback(
        async (
            artist: SearchArtist | MediaInlineArtist | Media,
            addToQueue: boolean = false
        ) => {
            const res = await Saavn.artistSongs(artist.id);

            if (!res.success || !res.data.songs.length) {
                return;
            }

            player.addSongs(res.data.songs, !addToQueue, !addToQueue);
        },
        [player]
    );

    const album = React.useCallback(
        async (album: SearchAlbum | Media, addToQueue: boolean = false) => {
            const res = await Saavn.album(album.id);

            if (!res.success || !res.data.songs.length) {
                return;
            }

            player.addSongs(res.data.songs, !addToQueue, !addToQueue);
        },
        [player]
    );

    return {
        song,
        album,
        playlist,
        artistSongs,
    } as const;
}
