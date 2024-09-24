"use client";

import BlockDescription from "@/components/blocks/description";
import BlockImage from "@/components/blocks/image";
import BlockMenu, { BlockMenuContent } from "@/components/blocks/menu";
import PullPlay from "@/components/blocks/play";
import BlockTitle from "@/components/blocks/title";
import Lucide from "@/components/lucide";
import { Card } from "@/components/ui/card";
import useFetchAndPlay from "@/contexts/hooks/use-play";
import useLibrary from "@/contexts/library";
import usePlayer from "@/contexts/player";
import Parser from "@/helpers/parser";
import { SearchResult } from "@/types/search";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function TopSong({
    item,
}: {
    item: SearchResult["songs"]["results"][0];
}) {
    const library = useLibrary();
    const player = usePlayer();
    const router = useRouter();
    const fetchPlay = useFetchAndPlay();

    const menuItems = React.useMemo<BlockMenuContent[]>(
        () => [
            ...(!player.playingSong(item.id)
                ? [
                      {
                          name: "Play now",
                          icon: Lucide.Play,
                          onClick: () => fetchPlay.song(item.id),
                      },
                      true,
                  ]
                : []),
            true,
            ...(!player.hasSong(item.id)
                ? [
                      {
                          name: "Add to queue",
                          icon: Lucide.Plus,
                          onClick: () => fetchPlay.song(item.id, true),
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
                name: "Song info",
                icon: Lucide.Info,
                onClick: () => router.push(`/song/${item.id}`),
            },
        ],
        [item, library, player, router, fetchPlay]
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
                className="flex-1 group relative border-0 flex items-center"
                asLink
            >
                <Link
                    href={`/song/${item.id}`}
                    className="p-2 flex flex-1 gap-4 items-center"
                >
                    <BlockImage src={item.image} alt={item.title} size={48}>
                        <PullPlay item={item} inset />
                    </BlockImage>
                    <div className="flex flex-col flex-1 justify-center">
                        <BlockTitle item={item} className="text-base" />
                        <BlockDescription item={item} className="text-sm" />
                    </div>
                    <BlockDescription
                        className="flex-1 capitalize text-sm"
                        item={item}
                    >
                        {Parser.entity(item.language)} •{" "}
                        {Parser.entity(item.album)}
                    </BlockDescription>
                </Link>
            </Card>
        </BlockMenu>
    );
}
