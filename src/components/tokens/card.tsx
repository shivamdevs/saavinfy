import { cn } from "@/lib/utils";
import { SearchAlbum, SearchPlaylist, SearchResultType } from "@/types/search";
import Image from "next/image";
import React from "react";
import { Text } from "./typography";
import PlayButton from "./play";
import Link from "next/link";
import { getSongArtists } from "./list";
import Entity from "./entity";

export type ItemCardProps = {
    item: SearchResultType;
    type?: string;
    onPlay?: () => Promise<void> | void;
    hidePlay?: boolean;
};

function ItemCard({ item, type, onPlay, hidePlay }: ItemCardProps) {
    return (
        <div
            className={cn(
                "p-4 hover:bg-accent focus-within:bg-accent",
                "transition-all rounded-md relative",
                "flex flex-col items-stretch gap-2 group"
            )}
        >
            <div className="relative w-full aspect-square">
                <Image
                    src={item.image.at(-1)?.url!}
                    alt={item.title ?? item.name}
                    width={200}
                    height={200}
                    className={cn("absolute inset-0 object-cover rounded-md", {
                        "rounded-full": item.type === "artist",
                    })}
                />
                {!hidePlay && <PlayButton size={48} onClick={onPlay} />}
            </div>
            <Text className="line-clamp-2">
                <Entity html={item.title ?? item?.name} />
            </Text>
            <Text className="text-sm text-secondary-foreground line-clamp-2">
                <Entity html={item.description} />
                {type && type === "playlist" && getPlaylistDescription(item)}
                {type && type === "album" && getAlbumDescription(item)}
                {type && type === "artist" && <Entity html={item.role ?? ""} />}
            </Text>
            <Link
                className="absolute inset-0"
                href={`/${item.type}/${item.id}`}
            />
        </div>
    );
}

export default ItemCard;

function getPlaylistDescription(item: SearchResultType) {
    const playlist = item as SearchPlaylist;

    const count = playlist.songCount ?? 0;

    return (
        <>
            <span className="capitalize">
                <Entity html={playlist.language} />
            </span>
            {count !== 0 && ` • ${count} song${count === 1 ? "" : "s"}`}
        </>
    );
}

function getAlbumDescription(item: SearchResultType) {
    const album = item as SearchAlbum;

    const count = album.playCount ?? 0;

    const artists = getSongArtists(album.artists?.primary, album.artist);

    return (
        <>
            <Entity html={album.year} />
            <span className="capitalize">
                {" • "}
                <Entity html={album.language} />
            </span>
            {count !== 0 && ` • ${count} play${count === 1 ? "" : "s"}`}
            {artists && <> • {artists}</>}
        </>
    );
}
