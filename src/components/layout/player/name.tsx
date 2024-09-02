"use client";

import BlockDescription from "@/components/blocks/description";
import BlockImage from "@/components/blocks/image";
import BlockTitle from "@/components/blocks/title";
import usePlayer from "@/contexts/player";
import React from "react";

export default function PlayerName() {
    const player = usePlayer();

    const item = player.currentSong;

    if (!item) {
        return null;
    }

    return (
        <div className="flex items-center gap-4">
            <BlockImage src={item.image} alt={item.title} size={48} show />
            <div className="flex flex-col flex-1 justify-center">
                <BlockTitle item={item} className="text-base" />
                <BlockDescription item={item} className="text-sm" />
            </div>
        </div>
    );
}
