"use client";

import React from "react";
import PlayerTrack from "./track";
import PlayerName from "./name";
import PlayerControls from "./controls";
import PlayerOptions from "./options";
import usePlayer from "@/contexts/player";
import { cn } from "@/lib/utils";
import PlayerFullScreen from "../parts/fullscreen";
import useColors from "@/contexts/hooks/use-colors";

export default function Player() {
    const player = usePlayer();
    const colors = useColors(player.currentSong?.image);

    if (player.queue.length === 0) {
        return null;
    }

    return (
        <footer
            className={cn("relative", {
                "flex-1 flex flex-col": player.fullScreen,
            })}
            style={{
                backgroundColor: player.fullScreen ? colors?.background : "",
            }}
            id="fullscreen"
        >
            {player.fullScreen && <PlayerFullScreen />}
            <div
                className={cn("relative h-20", {
                    "backdrop-blur-sm h-24 pt-4 bg-gradient-to-b from-background/50 to-background":
                        player.fullScreen,
                })}
            >
                <PlayerTrack
                    className={cn({
                        "mt-3": player.fullScreen,
                    })}
                />
                <div className="grid grid-cols-3 p-4">
                    <PlayerName />
                    <PlayerControls />
                    <PlayerOptions />
                </div>
            </div>
        </footer>
    );
}
