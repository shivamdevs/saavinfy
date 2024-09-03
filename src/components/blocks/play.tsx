"use client";

import { Button } from "@/components/ui/button";
import { SearchResultType } from "@/types/search";
import React from "react";
import { cn } from "@/lib/utils";
import useFetchAndPlay from "@/contexts/hooks/use-play";
import { MediaSong } from "@/types/media";
import usePlayer from "@/contexts/player";
import Lucide from "@/components/lucide";
import ScreenReader from "./screen-reader";

export type PullPlayProps = {
    item: SearchResultType | MediaSong;
    className?: string;
    noPull?: boolean;
    inQueue?: boolean;
    inset?: boolean;

    onClick?: () => void;
};
export default function PullPlay({
    item,
    className,
    noPull,
    inset,
    inQueue,
    onClick,
}: PullPlayProps) {
    const player = usePlayer();
    const fetchPlay = useFetchAndPlay();

    return (
        <Button
            size="icon"
            type="button"
            className={cn(
                "rounded-full size-14 shadow p-2",
                "opacity-0 transition-all z-20",
                "group-hover:opacity-100 group-focus-within:opacity-100",
                {
                    "absolute bottom-2 right-2 -mb-4 ": !noPull,
                    "group-hover:mb-0 group-focus-within:mb-0": !noPull,
                },
                {
                    "size-9 absolute right-1/2 bottom-1/2": inset,
                    "transform translate-x-1/2 translate-y-1/2": inset,
                    "hover:rounded-none hover:size-full hover:duration-75":
                        inset,
                },
                className
            )}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                if (onClick) {
                    onClick();
                }

                if (item.type === "song") {
                    const song = item as MediaSong;
                    if (song.downloadUrl) {
                        if (inQueue) {
                            player.play(song);
                        } else {
                            player.addSong(song);
                        }
                    } else {
                        fetchPlay.song(song.id, true);
                    }
                }
            }}
        >
            <Lucide.Play fill="currentColor" />
            <ScreenReader play={item} />
        </Button>
    );
}
