"use client";

import React, { useCallback, useMemo } from "react";
import BlockDescription from "@/components/blocks/description";
import BlockImage from "@/components/blocks/image";
import BlockTitle from "@/components/blocks/title";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SearchResultType } from "@/types/search";
import Link from "next/link";
import ScreenReader from "../../../../components/blocks/screen-reader";
import BlockMenu, { BlockMenuContent } from "@/components/blocks/menu";
import IconSleeping from "@/components/icons/sleeping";
import PullPlay from "@/components/blocks/play";
import useFetchAndPlay from "@/contexts/hooks/use-play";
import Lucide from "@/components/lucide";
import { useRouter } from "next/navigation";
import useLibrary from "@/contexts/library";

export type GridListProps = {
    title?: string;
    items: SearchResultType[];
};

export default function GridList({ title, items }: GridListProps) {
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
                    <GridItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

function GridItem({ item }: { item: SearchResultType }) {
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
                    "w-56 border-0 relative",
                    "p-4 flex flex-col gap-2 group"
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
                    size={192}
                    className={cn(item.type === "artist" && "rounded-full")}
                >
                    <PullPlay item={item} onClick={() => play()} />
                </BlockImage>
                <BlockTitle item={item} className="text-lg line-clamp-2" />
                <BlockDescription
                    item={item}
                    className="text-sm line-clamp-2"
                />
            </Card>
        </BlockMenu>
    );
}
