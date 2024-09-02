"use client";

import React from "react";
import PlayerTrack from "./track";
import PlayerName from "./name";
import PlayerControls from "./controls";
import PlayerOptions from "./options";
import usePlayer from "@/contexts/player";

export default function Player() {
    const player = usePlayer();

    if (player.queue.length === 0) {
        return null;
    }

    return (
        <footer className="relative h-20" id="fullscreen">
            <PlayerTrack />
            <div className="grid grid-cols-3 p-4">
                <PlayerName />
                <PlayerControls />
                <PlayerOptions />
            </div>
        </footer>
    );
}
