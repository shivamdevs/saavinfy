import {
    MediaInlineArtist,
    MediaInlineArtists,
    MediaSong,
    MediaSongAlbum,
} from "@/types/media";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Text, TimeSpan } from "./typography";
import LucideClock from "../lucide/clock";
import LucideHash from "../lucide/hash";
import SongListButton from "./list-button";
import PlayingTitle from "./title";
import RoundButton from "./button";
import AddToQueue from "./queue";
import ListImage from "./list-image";
import Entity from "./entity";

export type SongListProps = {
    items: MediaSong[];
    className?: string;
    noHeader?: boolean;
    noAlbum?: boolean;
    noIndex?: boolean;
    noDuration?: boolean;
    asId?: boolean;
    asQueue?: boolean;
    addToSearch?: {
        query: string;
        type: string;
    };
};

function SongList({
    items,
    className,
    noDuration,
    noHeader,
    noAlbum,
    noIndex,
    asId,
    asQueue,
    addToSearch,
}: SongListProps) {
    return (
        <div className="flex-1 w-full">
            {!noHeader && (
                <header
                    className={cn(
                        "my-4 border-b border-b-border sticky top-[7.5rem] py-2",
                        "z-20 layout-card rounded-none flex items-center gap-4",
                        className
                    )}
                >
                    {!noIndex && (
                        <Text className="text-secondary-foreground text-right w-11">
                            <LucideHash className="ml-auto" size={16} />
                        </Text>
                    )}
                    <Text className="text-secondary-foreground text-sm font-semibold flex-1">
                        Title
                    </Text>
                    {!noAlbum && (
                        <Text className="text-secondary-foreground text-sm font-semibold flex-1">
                            Album
                        </Text>
                    )}
                    <span className="text-secondary-foreground w-8 flex-center"></span>
                    {!noDuration && (
                        <span className="text-secondary-foreground w-16 flex-center">
                            <LucideClock size={16} />
                        </span>
                    )}
                </header>
            )}
            {items.map((song, index) => (
                <div
                    key={song.id}
                    className={cn(
                        "flex items-center p-2 relative",
                        "hover:bg-accent focus-within:bg-accent rounded-md",
                        "transition-all group gap-4"
                    )}
                >
                    {!noIndex && (
                        <div className="flex absolute right-full transform translate-x-11">
                            <SongListButton
                                song={song}
                                asId={asId}
                                index={index}
                                addToSearch={addToSearch}
                            />
                        </div>
                    )}
                    <div
                        className={cn("flex items-center gap-2 flex-1", {
                            "ml-12": !noIndex,
                        })}
                    >
                        <ListImage
                            song={song}
                            asId={asId}
                            playinline={noIndex}
                            asQueue={asQueue}
                            addToSearch={addToSearch}
                        />
                        <div>
                            <PlayingTitle
                                song={song.id}
                                className="font-semibold line-clamp-1"
                            >
                                <Entity html={song.name ?? song.title} />
                            </PlayingTitle>
                            <Text className="text-sm text-secondary-foreground line-clamp-1">
                                {getSongArtists(
                                    song.artists?.primary,
                                    song.description
                                )}
                            </Text>
                        </div>
                    </div>
                    {!noAlbum && (
                        <div className="flex-1">
                            <Text className="text-sm text-secondary-foreground">
                                {getSongAlbum(song.album)}
                            </Text>
                        </div>
                    )}
                    <div>
                        <AddToQueue
                            song={song}
                            asId={asId}
                            asQueue={asQueue}
                            addToSearch={addToSearch}
                        />
                    </div>
                    {!noDuration && (
                        <div className="items-center gap-2 w-16 text-right">
                            <TimeSpan time={song.duration} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default SongList;

export function getSongArtists(
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
                        <Entity html={artist.name} />
                    </Link>
                </React.Fragment>
            )
        ) ??
        artist ??
        ""
    );
}

export function getSongAlbum(album?: MediaSongAlbum | string) {
    if (!album) return null;

    if (typeof album === "string") {
        return album;
    }

    return (
        <Link
            href={`/album/${album.id}`}
            className="hover:underline relative z-10 line-clamp-2 inline-block"
        >
            <Entity html={album.name} />
        </Link>
    );
}
