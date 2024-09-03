"use client";

import { MediaSong } from "@/types/media";
import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import BlockImage from "./image";
import BlockTitle from "./title";
import BlockDescription from "./description";
import Block from "./_blocks";
import IconSleeping from "../icons/sleeping";
import { TimeSpan } from "../tokens/typography";
import { Button } from "../ui/button";
import Lucide from "../lucide";
import Tippy from "../ui/tooltip";
import useLibrary from "@/contexts/library";
import usePlayer from "@/contexts/player";
import { cn } from "@/lib/utils";
import PullPlay from "./play";

export default function Song({ item }: { item: MediaSong }) {
    const library = useLibrary();
    const player = usePlayer();

    return (
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
                    <BlockDescription item={item} className="text-sm">
                        {Block.songArtists(item.artists.primary)}
                    </BlockDescription>
                </div>
                <BlockDescription
                    className="flex-1 capitalize text-sm"
                    item={item}
                >
                    {Block.songAlbum(item)}
                </BlockDescription>
                <TimeSpan time={item.duration} className="text-sm" />
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
                        className={cn("rounded-full", {
                            "!text-primary": library.isFavorite(item.id),
                        })}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            library.toggleFavorite(item.id);
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
                <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                    title="More options"
                >
                    <Lucide.Ellipsis size={16} />
                </Button>
            </Link>
        </Card>
    );
}

export function SongList({ items }: { items: MediaSong[] }) {
    return (
        <div className="w-full flex flex-col">
            {items.length === 0 && <IconSleeping className="mx-auto" />}
            {items.map((item) => (
                <Song key={item.id} item={item} />
            ))}
        </div>
    );
}
