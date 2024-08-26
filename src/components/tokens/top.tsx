"use client";

import { MediaSong } from "@/types/media";
import { SearchResultType } from "@/types/search";
import React from "react";
import { Heading, Text } from "./typography";
import SongList from "./list";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import PlayButton from "./play";
import PlayingTitle from "./title";
import Entity from "./entity";
import useFetchAndPlay from "@/contexts/hooks/use-play";
import useLibrary from "@/contexts/library";
import usePlayer from "@/contexts/player";

export type ItemCardProps = {
    item?: SearchResultType;
    songs: MediaSong[];
    addToSearch?: {
        query: string;
        type: string;
    };
};

function TopResult({ item, songs, addToSearch }: ItemCardProps) {
    const fetchPlay = useFetchAndPlay();
    const player = usePlayer();
    const library = useLibrary();

    if (!item && !songs.length) {
        return null;
    }

    return (
        <div className="flex w-full my-10 gap-10">
            {item && (
                <div className="flex-1 max-w-[480px]">
                    <Heading level={2} className="text-2xl font-semibold mb-4">
                        Top Result
                    </Heading>
                    <div
                        className={cn(
                            "p-4 hover:bg-accent focus-within:bg-accent",
                            "transition-all rounded-md relative bg-accent-light",
                            "flex flex-col items-stretch gap-2 group"
                        )}
                    >
                        <div className="relative w-24 aspect-square">
                            <Image
                                src={item.image.at(-1)?.url!}
                                alt={item.title ?? item.name}
                                width={200}
                                height={200}
                                className={cn(
                                    "absolute inset-0 object-cover rounded-md",
                                    {
                                        "rounded-full": item.type === "artist",
                                    }
                                )}
                            />
                        </div>
                        <PlayingTitle
                            song={item.type === "song" ? item.id : ""}
                            className="line-clamp-2 text-3xl font-bold"
                        >
                            <Entity html={item.title ?? item?.name} />
                        </PlayingTitle>
                        <Text className="text-sm text-secondary-foreground line-clamp-2">
                            <span className="capitalize">{item.type} • </span>
                            <Entity html={item.description} />
                        </Text>
                        <PlayButton
                            size={48}
                            songId={item.type === "song" ? item.id : ""}
                            onClick={() => {
                                if (item.type === "song") {
                                    if (player.playingSong(item.id)) {
                                        if (player.playing) {
                                            player.pause();
                                        } else {
                                            player.play();
                                        }
                                    } else {
                                        fetchPlay.song(item.id);
                                    }
                                } else if (item.type === "album") {
                                    fetchPlay.album(item);
                                } else if (item.type === "artist") {
                                    fetchPlay.artistSongs(item);
                                } else if (item.type === "playlist") {
                                    fetchPlay.playlist(item);
                                }

                                if (addToSearch) {
                                    library.addSearch(
                                        addToSearch.query,
                                        addToSearch.type
                                    );
                                }
                            }}
                        />
                        <Link
                            className="absolute inset-0"
                            href={`/${item.type}/${item.id}`}
                        />
                    </div>
                </div>
            )}
            {songs.length > 0 && (
                <div className="flex-[2]">
                    <Heading level={2} className="text-2xl font-semibold mb-4">
                        Songs
                    </Heading>
                    <SongList
                        items={songs}
                        noDuration
                        noHeader
                        asId
                        noIndex
                        addToSearch={addToSearch}
                    />
                </div>
            )}
        </div>
    );
}

export default TopResult;
