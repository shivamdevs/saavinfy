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
import { SearchResult } from "@/types/search";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function TopResultItem({
    item,
}: {
    item: SearchResult["topQuery"]["results"][0];
}) {
    const library = useLibrary();
    const router = useRouter();
    const fetchPlay = useFetchAndPlay();

    const play = React.useCallback(
        (addToQueue: boolean = false) => {
            if (item.type === "album") {
                fetchPlay.album(item, addToQueue);
            } else if (item.type === "playlist") {
                fetchPlay.playlist(item, addToQueue);
            } else if (item.type === "artist") {
                fetchPlay.artistSongs(item, addToQueue);
            } else {
                fetchPlay.song(item.id, addToQueue);
            }
        },
        [item, fetchPlay]
    );

    const menuItems = React.useMemo<BlockMenuContent[]>(
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
            <Card className="group relative" asLink>
                <Link
                    href={`/${item.type}/${item.id}`}
                    className="p-5 flex flex-col gap-4"
                >
                    <BlockImage src={item.image} alt={item.title} size={120} />
                    <BlockTitle item={item} className="text-4xl" />
                    <BlockDescription item={item} />
                </Link>
                <PullPlay
                    item={item}
                    className="right-6 bottom-6"
                    onClick={() => play()}
                />
            </Card>
        </BlockMenu>
    );
}
