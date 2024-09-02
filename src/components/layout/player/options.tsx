"use client";

import React from "react";
import usePlayer from "@/contexts/player";
import { Button } from "@/components/ui/button";
import { usePlayerOptions } from "@/contexts/player/hooks";
import { cn } from "@/lib/utils";
import Tippy from "@/components/ui/tooltip";
import PlayerVolume from "./volume";
import Lucide from "@/components/lucide";

export default function PlayerOptions() {
    const player = usePlayer();

    const options = usePlayerOptions();

    const FullScreenIcon = player.fullScreen
        ? Lucide.Minimize2
        : Lucide.Maximize2;

    return (
        <div className="flex-center justify-end gap-4">
            {!player.fullScreen && (
                <>
                    <Tippy
                        content={options.panels.is(
                            "info",
                            "Hide info",
                            "Show info"
                        )}
                    >
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className={cn("rounded-full", {
                                "!text-primary": options.panels.is("info"),
                            })}
                            disabled={!player.currentSong}
                            onClick={() => options.panels.toggle("info")}
                        >
                            <Lucide.Info size={16} />
                        </Button>
                    </Tippy>
                    <Tippy
                        content={
                            options.lyrics.is ? "Hide lyrics" : "Show lyrics"
                        }
                    >
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className={cn("rounded-full", {
                                "!text-primary": options.lyrics.is,
                            })}
                            onClick={options.lyrics.toggle}
                        >
                            <Lucide.MicVocal size={16} />
                        </Button>
                    </Tippy>
                    <Tippy
                        content={options.panels.is(
                            "queue",
                            "Hide queue",
                            "Show queue"
                        )}
                    >
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className={cn("rounded-full", {
                                "!text-primary": options.panels.is("queue"),
                            })}
                            disabled={!player.queue.length}
                            onClick={() => options.panels.toggle("queue")}
                        >
                            <Lucide.ListMusic size={16} />
                        </Button>
                    </Tippy>
                </>
            )}
            <PlayerVolume />
            <Tippy
                content={player.fullScreen ? "Exit fullscreen" : "Fullscreen"}
            >
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className={cn("rounded-full", {
                        "!text-primary": player.fullScreen,
                    })}
                    onClick={() => {
                        player.setFullScreen(!player.fullScreen);
                    }}
                >
                    <FullScreenIcon size={16} />
                </Button>
            </Tippy>
        </div>
    );
}
