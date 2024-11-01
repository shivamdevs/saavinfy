"use client";

import { MediaSong } from "@/types/media";
import React, { useMemo } from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import BlockImage from "./image";
import BlockTitle from "./title";
import BlockDescription from "./description";
import Block from "./_blocks";
import IconSleeping from "../icons/sleeping";
import { Button } from "../ui/button";
import Lucide from "../lucide";
import Tippy from "../ui/tooltip";
import useLibrary from "@/contexts/library";
import usePlayer from "@/contexts/player";
import { cn } from "@/lib/utils";
import PullPlay from "./play";
import BlockMenu, { BlockMenuContent } from "./menu";
import { useRouter } from "next/navigation";
import BlockTime from "./time";
import downloadFromLink from "@/lib/download";
import useStack from "@/contexts/stack";

export default function Song({ item }: { item: MediaSong }) {
    const library = useLibrary();
    const player = usePlayer();
    const router = useRouter();

    const { newStack } = useStack();

    const menuItems = useMemo<BlockMenuContent[]>(
        () => [
            ...(!player.hasSong(item)
                ? [
                      {
                          name: "Add to queue",
                          icon: Lucide.Plus,
                          onClick: () => player.addSong(item),
                      },
                      true,
                  ]
                : []),
            {
                name: library.isFavorite(item.id)
                    ? "Remove from favorites"
                    : "Add to favorites",
                icon: library.isFavorite(item.id)
                    ? Lucide.HeartOff
                    : Lucide.Heart,
                onClick: () =>
                    library.toggleFavorite(item.id, item.title ?? item.name),
            },
            {
                name: "Add to playlist",
                icon: Lucide.CirclePlus,
                sub: [
                    {
                        name: "New playlist",
                        icon: Lucide.Plus,
                    },
                    (library.playlists || []).length > 0 && true,
                    ...library.playlists.map((playlist) => ({
                        name: playlist.name,
                        onClick: () =>
                            library.addSongsToPlaylist(playlist.id, item.id),
                    })),
                ],
            },
            true,
            {
                name: "Download",
                icon: Lucide.Download,
                onClick: () => {
                    const ddl = item.downloadUrl.at(-1);

                    const stack = newStack(
                        `download/${item.id}/${ddl?.quality}`,
                        `Downloading ${item.title ?? item.name}.`,
                        {
                            type: "loading",
                            progress: 0,
                            count: item.duration,
                        }
                    );

                    if (ddl) {
                        downloadFromLink(
                            ddl.url,
                            item.title ?? item.name ?? "",
                            ddl.quality,
                            stack
                        );
                    } else {
                        stack.error(
                            `Failed to download ${item.title ?? item.name}.`,
                            "No download links found."
                        );
                    }
                },
            },
            true,
            {
                name: "Song info",
                icon: Lucide.Info,
                onClick: () => router.push(`/song/${item.id}`),
            },
            {
                name: "Go to album",
                icon: Lucide.Disc3,
                onClick: () => router.push(`/album/${item.album.id}`),
            },
        ],
        [item, library, player, router, newStack]
    );

    return (
        <BlockMenu items={menuItems}>
            <Card
                {...Object.entries(item).reduce(
                    (acc, [key, value]) =>
                        typeof value === "string"
                            ? { ...acc, [`data-${key.toLowerCase()}`]: value }
                            : acc,
                    {}
                )}
                className="flex-1 group relative border-0 flex items-center p-2 gap-4"
                asLink
            >
                <Link
                    href={`/song/${item.id}`}
                    className="absolute inset-0"
                    aria-label={`View ${item.title}`}
                />
                <BlockImage src={item.image} alt={item.title} size={48}>
                    <PullPlay item={item} inset />
                </BlockImage>
                <div className="flex flex-col flex-1 justify-center">
                    <BlockTitle item={item} className="text-base" />
                    <BlockDescription item={item} className="text-sm">
                        {Block.songArtists(item.artists.primary)}
                    </BlockDescription>
                </div>
                <BlockDescription
                    className="flex-1 capitalize text-sm sm:inline-block hidden"
                    item={item}
                >
                    {Block.songAlbum(item.album)}
                </BlockDescription>
                <BlockTime
                    time={item.duration}
                    className="text-sm sm:inline-block hidden"
                />
                <Tippy
                    content={
                        library.isFavorite(item.id)
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                >
                    <Button
                        size="icon"
                        variant="ghost"
                        className={cn("rounded-full z-10", {
                            "!text-primary": library.isFavorite(item.id),
                        })}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            library.toggleFavorite(
                                item.id,
                                item.title ?? item.name
                            );
                        }}
                    >
                        <Lucide.Heart
                            size={16}
                            fill={
                                library.isFavorite(item.id)
                                    ? "currentColor"
                                    : "none"
                            }
                        />
                    </Button>
                </Tippy>
                <BlockMenu dropdown items={menuItems}>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full z-10 sm:flex hidden"
                        title="More options"
                    >
                        <Lucide.Ellipsis size={16} />
                    </Button>
                </BlockMenu>
            </Card>
        </BlockMenu>
    );
}

export function SongList({
    items,
    className,
}: {
    items: MediaSong[];
    className?: string;
}) {
    return (
        <div className={cn("w-full flex flex-col", className)}>
            {items.length === 0 && <IconSleeping className="mx-auto" />}
            {items.map((item) => (
                <Song key={item.id} item={item} />
            ))}
        </div>
    );
}
