"use client";

// import BackgroundCover from "@/components/blocks/bg-cover";
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
        <div className="flex-1 relative">
            {/* <BackgroundCover
                src={currentSong.image.at(-1)?.url}
                className="absolute inset-0"
            /> */}
            <div className="absolute inset-0 flex flex-col bg-[rgba(var(--cover-rgb)/0.8)] backdrop-blur">
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
        </div>
    );
}
