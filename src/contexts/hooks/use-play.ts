import { SearchAlbum, SearchArtist, SearchPlaylist } from "@/types/search";
import usePlayer from "../player";
import React from "react";
import { serverCall } from "@/lib/call";
import {
    MediaAlbum,
    MediaArtistSongs,
    MediaPlaylist,
    MediaSong,
} from "@/types/media";
import { Endpoints } from "@/config/endpoints";

export default function useFetchAndPlay() {
    const player = usePlayer();

    const song = React.useCallback(
        async (ids: string | string[], addToQueue: boolean = false) => {
            if (!ids) return;

            const res = await serverCall<MediaSong[]>(
                Endpoints.songsByIds(ids)
            );

            if (!res.success || !res.data.length) {
                return;
            }

            player.addSongs(res.data, !addToQueue, !addToQueue);
        },
        [player]
    );

    const playlist = React.useCallback(
        async (playlist: SearchPlaylist) => {
            const res = await serverCall<MediaPlaylist>(
                Endpoints.songsFromPlaylist(
                    playlist.id,
                    1,
                    playlist.songCount ?? 99999
                )
            );

            if (!res.success || !res.data.songs.length) {
                return;
            }

            player.addSongs(res.data.songs, true, true);
        },
        [player]
    );

    const artistSongs = React.useCallback(
        async (artist: SearchArtist) => {
            const res = await serverCall<MediaArtistSongs>(
                Endpoints.songsFromArtist(
                    artist.id,
                    1,
                    artist.songCount ?? 99999
                )
            );

            if (!res.success || !res.data.songs.length) {
                return;
            }

            player.addSongs(res.data.songs, true, true);
        },
        [player]
    );

    const album = React.useCallback(
        async (album: SearchAlbum) => {
            const res = await serverCall<MediaAlbum>(Endpoints.album(album.id));

            if (!res.success || !res.data.songs.length) {
                return;
            }

            player.addSongs(res.data.songs, true, true);
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
