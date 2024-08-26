"use client";

import usePlayer from "@/contexts/player";
import React from "react";
import TrackSeeker from "./track";
import SongCard from "./song";
import Controller from "./controller";
import { cn } from "@/lib/utils";
import useColors from "@/contexts/hooks/use-colors";

function FooterPlayer() {
    const player = usePlayer();
    const colors = useColors(player.currentSong?.image);

    if (player.queue.length === 0 || !player.current) {
        return null;
    }

    return (
        <footer
            className={cn("layout-card py-2 px-5 flex flex-col gap-4", {
                "bg-black/50": player.fullScreen,
            })}
            style={
                {
                    "--current-color":
                        colors?.result?.value
                            .filter((_, i) => i < 3)
                            .join(" ") || "255 170 102",
                } as React.CSSProperties
            }
        >
            <TrackSeeker />
            <div className="grid grid-cols-3 gap-10">
                <SongCard />
                <Controller />
            </div>
        </footer>
    );
}

export default FooterPlayer;
