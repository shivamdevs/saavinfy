"use client";

import React from "react";
import usePlayer from "@/contexts/player";
import { Button } from "@/components/ui/button";
import { usePlayerNavigation, usePlayerState } from "@/contexts/player/hooks";

import { cn } from "@/lib/utils";
import Tippy from "@/components/ui/tooltip";
import Lucide from "@/components/lucide";

export default function PlayerControls() {
    const player = usePlayer();

    const [playing, ended] = usePlayerState();
    const navigate = usePlayerNavigation();

    const Icon = ended
        ? Lucide.RotateCcw
        : playing
          ? Lucide.Pause
          : Lucide.Play;

    const LoopIcon = player.options.loop === 1 ? Lucide.Repeat1 : Lucide.Repeat;

    return (
        <div className="flex-center gap-4">
            <Tippy content="Shuffle">
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="rounded-full"
                    disabled={player.queue.length < 2}
                    onClick={player.shuffleQueue}
                >
                    <Lucide.Shuffle size={16} />
                </Button>
            </Tippy>
            <Tippy content="Previous">
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="rounded-full size-10"
                    disabled={!navigate.hasPrevious}
                    onClick={navigate.previous}
                >
                    <Lucide.SkipBack size={18} />
                </Button>
            </Tippy>
            <Tippy content={ended ? "Restart" : playing ? "Pause" : "Play"}>
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="rounded-full size-12"
                    onClick={navigate.toggle}
                >
                    <Icon fill={!ended ? "currentColor" : "none"} />
                </Button>
            </Tippy>
            <Tippy content="Next">
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="rounded-full size-10"
                    disabled={!navigate.hasNext}
                    onClick={navigate.next}
                >
                    <Lucide.SkipForward size={18} />
                </Button>
            </Tippy>
            <Tippy
                content={
                    player.options.loop === 2
                        ? "Loop all"
                        : player.options.loop === 1
                          ? "Loop one"
                          : "No loop"
                }
            >
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className={cn("rounded-full", {
                        "!text-primary": player.options.loop !== 0,
                    })}
                    onClick={navigate.toggleLoop}
                >
                    <LoopIcon size={16} />
                </Button>
            </Tippy>
        </div>
    );
}
