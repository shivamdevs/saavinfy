"use client";

import { MediaSong } from "@/types/media";
import React from "react";
import RoundButton from "./button";
import useLibrary from "@/contexts/library";
import LucideHeart from "../lucide/heart";
import { cn } from "@/lib/utils";

export type FavoriteProps = {
    song: MediaSong;
};

export default function ToggleFavorite({ song }: FavoriteProps) {
    const library = useLibrary();

    const inFav = library.isFavorite(song.id);

    return (
        <RoundButton
            className="[&:not(:disabled)]:hover:bg-primary-foreground/10 relative z-10 disabled:invisible"
            size={32}
            onClick={() => {
                library.toggleFavorite(song.id);
            }}
        >
            <LucideHeart
                size={16}
                className={cn({
                    "text-primary": inFav,
                })}
                fill={inFav ? "currentColor" : "none"}
            />
        </RoundButton>
    );
}
