"use client";

import BlockImage from "@/components/blocks/image";
import Ripple from "@/components/magicui/ripple";
import usePlayer from "@/contexts/player";
import React from "react";

export default function PlayerFullScreen() {
    const player = usePlayer();

    const { currentSong } = player;

    if (!currentSong) {
        return null;
    }

    return (
        <div className="flex-1 flex flex-col">
            <Ripple mainCircleSize={500} />

            <div className="absolute inset-0 flex-center flex-col">
                <BlockImage
                    src={currentSong.image}
                    alt={currentSong.title}
                    size={560}
                    className="rounded-3xl"
                />
            </div>
        </div>
    );
}
