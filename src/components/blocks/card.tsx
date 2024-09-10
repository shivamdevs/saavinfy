"use client";

import useColors from "@/contexts/hooks/use-colors";
import {
    MediaAlbum,
    MediaArtist,
    MediaPlaylist,
    MediaSong,
    MediaType,
} from "@/types/media";
import React from "react";
import BlockImage from "./image";
import Parser from "@/helpers/parser";
import Block from "./_blocks";
import PullPlay from "./play";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import useLibrary from "@/contexts/library";
import Lucide from "../lucide";
import BlockCardMenu from "./card-menu";
import IconVerified from "../icons/verified";
import BlockTime from "./time";

export type BlockCardProps = React.PropsWithChildren<{
    item: MediaSong | MediaArtist | MediaPlaylist | MediaAlbum;
    type: MediaType;
    float?: React.ReactNode;
}>;
export default function BlockCard({
    item,
    type,
    children,
    float,
}: BlockCardProps) {
    const colors = useColors(item.image);

    const library = useLibrary();

    const song = item as MediaSong;
    const album = item as MediaAlbum;
    const artist = item as MediaArtist;

    // const playlist = item as MediaPlaylist;

    return (
        <div
            className={"w-full"}
            style={{
                backgroundColor: colors?.background,
            }}
        >
            <div className="p-5">
                <div className="flex flex-row items-end gap-5">
                    <BlockImage
                        src={item.image}
                        alt={item.name}
                        size={240}
                        className="shadow-lg"
                    />
                    <div
                        className={cn(
                            "flex flex-col flex-1 gap-5",
                            colors.result &&
                                (colors.isDark ? "text-white" : "text-black")
                        )}
                    >
                        <h2 className="capitalize text-sm font-semibold inline-flex items-center gap-2">
                            {item.type === "artist" && artist?.isVerified ? (
                                <>
                                    <IconVerified className="text-primary shadow-sm size-6" />
                                    <span>Verified</span>
                                </>
                            ) : (
                                ""
                            )}
                            <span>{item.type ?? "song"}</span>•
                            <span>
                                {song?.language ?? artist?.dominantType}
                            </span>
                            {album?.songCount && (
                                <span> • {album.songCount} songs</span>
                            )}
                        </h2>
                        <h3 className="text-5xl font-semibold">
                            {Parser.entity(item.name)}
                        </h3>
                        {type === "song" && (
                            <div className="text-sm inline-flex gap-2 flex-wrap items-center">
                                <div>
                                    {Block.songArtists(
                                        song?.artists.primary.at(0)
                                    )}
                                </div>
                                •<div>{Block.songAlbum(item)}</div>•
                                <div>{song?.year}</div>•
                                <BlockTime
                                    className="text-current text-base"
                                    time={song?.duration}
                                />
                                •<div>{Parser.numeric(song?.playCount)}</div>
                            </div>
                        )}
                        {type === "artist" && (
                            <div>
                                {Parser.numeric(artist?.followerCount)} active
                                followers
                            </div>
                        )}
                        {type === "album" && (
                            <div>{Parser.entity(album?.description)}</div>
                        )}
                    </div>
                </div>
            </div>
            <div className="p-5 bg-gradient-to-b from-background/10 via-[16rem] via-background to-background min-h-96">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5 mb-5">
                        <PullPlay noPull item={item} />
                        {type === "song" && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn("rounded-full size-14", {
                                    "!text-primary": library.isFavorite(
                                        item.id
                                    ),
                                })}
                                onClick={() => library.toggleFavorite(item.id)}
                            >
                                <Lucide.Heart
                                    fill={
                                        library.isFavorite(item.id)
                                            ? "currentColor"
                                            : "none"
                                    }
                                    size={24}
                                />
                            </Button>
                        )}
                        <BlockCardMenu item={item} type={type} />
                    </div>
                    <div className="flex justify-end items-center gap-5">
                        {float}
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
