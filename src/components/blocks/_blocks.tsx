import React from "react";
import {
    MediaInlineArtist,
    MediaInlineArtists,
    MediaSongAlbum,
} from "@/types/media";
import Link from "next/link";
import Parser from "@/helpers/parser";
import { SearchAlbum, SearchPlaylist, SearchResultType } from "@/types/search";

export default class Block {
    public static songArtists(
        artists?: MediaInlineArtists | MediaInlineArtist[] | string,
        artist?: string
    ) {
        if (typeof artists === "string" || !artists) {
            return artist ?? artists ?? "";
        }

        return (
            ((Array.isArray(artists) ? artists : artists?.all) ?? []).map(
                (artist, index) => (
                    <React.Fragment key={artist.id}>
                        {index !== 0 && ", "}
                        <Link
                            href={`/artist/${artist.id}`}
                            className="hover:underline relative z-10"
                        >
                            {Parser.entity(artist.name)}
                        </Link>
                    </React.Fragment>
                )
            ) ??
            artist ??
            ""
        );
    }

    public static songAlbum(album?: MediaSongAlbum | string) {
        if (!album) return null;

        if (typeof album === "string") {
            return album;
        }

        return (
            <Link
                href={`/album/${album.id}`}
                className="hover:underline relative z-10 line-clamp-2 inline-block"
            >
                {Parser.entity(album.name)}
            </Link>
        );
    }

    public static playlist(item: SearchResultType) {
        const playlist = item as SearchPlaylist;

        const count = playlist.songCount ?? 0;

        return (
            <>
                <span className="capitalize">
                    {Parser.entity(playlist.language)}
                </span>
                {count !== 0 && ` • ${count} song${count === 1 ? "" : "s"}`}
            </>
        );
    }

    public static album(item: SearchResultType) {
        const album = item as SearchAlbum;

        const count = album.playCount ?? 0;

        const artists = Block.songArtists(album.artists?.primary, album.artist);

        return (
            <>
                {Parser.entity(album.year)}
                <span className="capitalize">
                    {" • "}
                    {Parser.entity(album.language)}
                </span>
                {count !== 0 && ` • ${count} play${count === 1 ? "" : "s"}`}
                {artists && <> • {artists}</>}
            </>
        );
    }
}
