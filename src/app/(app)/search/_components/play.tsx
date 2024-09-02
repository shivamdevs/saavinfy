"use client";

import { Button } from "@/components/ui/button";
import { SearchResultType } from "@/types/search";
import React from "react";
import ScreenReader from "./screen-reader";
import { cn } from "@/lib/utils";
import useFetchAndPlay from "@/contexts/hooks/use-play";
import { MediaSong } from "@/types/media";
import usePlayer from "@/contexts/player";
import Lucide from "@/components/lucide";

export type PullPlayProps = {
    item: SearchResultType | MediaSong;
    className?: string;
    noPull?: boolean;
    inQueue?: boolean;
};
export default function PullPlay({
    item,
    className,
    noPull,
    inQueue,
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
                className
            )}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

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
