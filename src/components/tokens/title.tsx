"use client";

import React from "react";
import { Text, TextProps } from "./typography";
import { cn } from "@/lib/utils";
import usePlayer from "@/contexts/player";
import { MediaSong } from "@/types/media";

export type PlayingTitleProps = TextProps & {
    song: MediaSong | string;
};

function PlayingTitle({ className, song, ...props }: PlayingTitleProps) {
    const player = usePlayer();

    return (
        <Text
            className={cn(
                {
                    "text-primary": player.playingSong(song),
                },
                className
            )}
            {...props}
        />
    );
}

export default PlayingTitle;
