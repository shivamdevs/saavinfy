"use client";

import React, { useCallback, useMemo } from "react";
import BlockDescription from "@/components/blocks/description";
import BlockImage from "@/components/blocks/image";
import BlockTitle from "@/components/blocks/title";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SearchArtist, SearchResultType } from "@/types/search";
import Link from "next/link";
import BlockMenu, { BlockMenuContent } from "@/components/blocks/menu";
import IconSleeping from "@/components/icons/sleeping";
import PullPlay from "@/components/blocks/play";
import useFetchAndPlay from "@/contexts/hooks/use-play";
import Lucide from "@/components/lucide";
import { useRouter } from "next/navigation";
import useLibrary from "@/contexts/library";
import ScreenReader from "./screen-reader";
import { Media } from "@/types/media";
import Block from "./_blocks";
import Parser from "@/helpers/parser";

export type GridListProps = {
    title?: string;
    items: SearchResultType[] | Media[];
    small?: boolean;
};

export default function BlockGridList({ title, items, small }: GridListProps) {
    return (
        <div className="my-10">
            {title && (
                <h3 className="capitalize text-2xl my-5 px-4 font-semibold">
                    {title}
                </h3>
            )}
            {items.length === 0 && <IconSleeping className="mx-auto" />}
            <div className="w-full flex flex-wrap justify-start items-stretch">
                {items.map((item) => (
                    <GridItem key={item.id} item={item} small={!!small} />
                ))}
            </div>
        </div>
    );
}

function GridItem({
    item,
    small,
}: {
    item: SearchResultType | Media;
    small: boolean;
}) {
    const router = useRouter();
    const fetchPlay = useFetchAndPlay();
    const library = useLibrary();

    const play = useCallback(
        (addToQueue: boolean = false) => {
            if (item.type === "album") {
                fetchPlay.album(item, addToQueue);
            } else if (item.type === "playlist") {
                fetchPlay.playlist(item, addToQueue);
            } else if (item.type === "artist") {
                fetchPlay.artistSongs(item, addToQueue);
            }
        },
        [item, fetchPlay]
    );

    const menuItems = useMemo<BlockMenuContent[]>(
        () => [
            {
                name: "Play now",
                icon: Lucide.Play,
                onClick: () => play(),
            },
            {
                name: "Add to queue",
                icon: Lucide.Plus,
                onClick: () => play(true),
            },
            true,
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
                name: `View ${item.type}`,
                icon:
                    item.type === "album"
                        ? Lucide.Disc3
                        : item.type === "playlist"
                          ? Lucide.ListMusic
                          : item.type === "artist"
                            ? Lucide.MicVocal
                            : Lucide.Info,
                onClick: () => router.push(`/${item.type}/${item.id}`),
            },
        ],
        [item, library, play, router]
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
                className={cn(
                    "border-0 relative",
                    "flex flex-col group p-4",
                    small ? "w-40 gap-1" : "w-56 gap-2"
                )}
                asLink
            >
                <Link
                    href={`/${item.type}/${item.id}`}
                    className="absolute inset-0 z-10"
                >
                    <ScreenReader view={item} />
                </Link>
                <BlockImage
                    src={item.image}
                    alt={item.title}
                    size={small ? 128 : 192}
                    className={cn(item.type === "artist" && "rounded-full")}
                >
                    <PullPlay item={item} onClick={() => play()} />
                </BlockImage>
                <BlockTitle
                    item={item}
                    className={cn("text-lg line-clamp-2", small && "text-base")}
                />
                <BlockDescription
                    item={item}
                    className={cn("text-sm line-clamp-2", small && "text-sm")}
                >
                    {item.type === "album" && Block.album(item)}
                    {item.type === "artist" &&
                        Parser.entity((item as SearchArtist).role)}
                    {item.type === "playlist" && Block.playlist(item)}
                </BlockDescription>
            </Card>
        </BlockMenu>
    );
}
