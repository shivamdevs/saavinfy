"use client";

import usePlayer from "@/contexts/player";
import { usePlayerOptions } from "@/contexts/player/hooks";
import React from "react";
import OverlayHeader from "./_header";
import OverlayContent from "./_content";
import { MediaSong } from "@/types/media";
import BlockImage from "@/components/blocks/image";
import BlockTitle from "@/components/blocks/title";
import BlockDescription from "@/components/blocks/description";
import { List } from "@/components/magicui/list";
import { Card } from "@/components/ui/card";
import BlockMenu, { BlockMenuContent } from "@/components/blocks/menu";
import useLibrary from "@/contexts/library";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Lucide from "@/components/lucide";
import Tippy from "@/components/ui/tooltip";
import IconNotePad from "@/components/icons/notepad";
import downloadFromLink from "@/lib/download";
import useStack from "@/contexts/stack";

export default function OverlayQueue() {
    const player = usePlayer();
    const options = usePlayerOptions();

    const song = player.currentSong;

    const upcoming = React.useMemo(() => {
        if (!song) {
            return [];
        }

        return player.queue.slice(
            player.queue.findIndex((s) => s.id === song.id) + 1
        );
    }, [player.queue, song]);

    if (!options.panel) {
        return null;
    }

    return (
        <>
            <OverlayHeader title="Queue">
                {song && (
                    <Tippy content="Clear queue">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                                player.clearQueue();
                                options.update({ panel: undefined });
                            }}
                        >
                            <Lucide.ListX size={18} />
                        </Button>
                    </Tippy>
                )}
            </OverlayHeader>
            <OverlayContent>
                {song ? (
                    <>
                        <h4 className="font-medium my-4 px-4">Playing now</h4>
                        <List className="px-2">
                            <QueueItem key={song.id} item={song} />
                        </List>
                        {upcoming.length > 0 && (
                            <h4 className="font-medium mt-8 mb-4 px-4">
                                Up next
                            </h4>
                        )}
                        <List className="px-2 gap-0" mode="sync">
                            {upcoming.map((item) => (
                                <QueueItem key={item.id} item={item} />
                            ))}
                        </List>
                    </>
                ) : (
                    <>
                        <h4 className="text-center mt-32 text-secondary-foreground">
                            The queue is empty
                        </h4>
                        <IconNotePad
                            className="mx-auto mt-32"
                            width={200}
                            height={200}
                        />
                    </>
                )}
                <span className="block h-16" />
            </OverlayContent>
        </>
    );
}

function QueueItem({ item }: { item: MediaSong }) {
    const player = usePlayer();
    const library = useLibrary();
    const router = useRouter();

    const { newStack } = useStack();

    const menuItems = React.useMemo<BlockMenuContent[]>(
        () => [
            ...(player.currentSong?.id !== item.id
                ? [
                      {
                          name: "Play now",
                          icon: Lucide.Play,
                          onClick: () => player.play(item),
                      },
                      true,
                      {
                          name: "Remove from queue",
                          icon: Lucide.X,
                          onClick: () => player.removeSong(item),
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
                        onClick: () =>
                            library.setPlaylistEditor({
                                new: item.id,
                            }),
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
                            ? {
                                  ...acc,
                                  [`data-${key.toLowerCase()}`]: value,
                              }
                            : acc,
                    {}
                )}
                title={`Play ${item.title ?? item.name}`}
                className="flex-1 group relative border-0 flex items-center p-2 gap-4 cursor-pointer"
                asLink
            >
                <Button
                    variant="ghost"
                    className="absolute inset-0 h-auto"
                    aria-label={`Play ${item.title ?? item.name}`}
                    onClick={() => {
                        if (player.currentSong?.id === item.id) {
                            player.toggle();
                        } else {
                            player.play(item);
                        }
                    }}
                />
                <BlockImage src={item.image} alt={item.title} size={40} />
                <div className="flex flex-col flex-1">
                    <BlockTitle
                        item={item}
                        className="text-base line-clamp-1 z-10 pointer-events-none"
                    />
                    <BlockDescription
                        item={item}
                        className="text-sm line-clamp-1"
                    />
                </div>
                <BlockMenu dropdown items={menuItems}>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full z-10"
                    >
                        <Lucide.Ellipsis size={16} />
                    </Button>
                </BlockMenu>
            </Card>
        </BlockMenu>
    );
}
