import LucidePause from "@/components/lucide/pause";
import LucidePlay from "@/components/lucide/play";
import LucideRepeat from "@/components/lucide/repeat";
import LucideRepeat1 from "@/components/lucide/repeat-1";
import LucideRotateCcw from "@/components/lucide/rotate-ccw";
import LucideShuffle from "@/components/lucide/shuffle";
import LucideSkipBack from "@/components/lucide/skip-back";
import LucideSkipForward from "@/components/lucide/skip-forward";
import RoundButton from "@/components/tokens/button";
import usePlayer from "@/contexts/player";
import { usePlayerNavigation, usePlayerState } from "@/contexts/player/hooks";
import { cn } from "@/lib/utils";
import React from "react";

export default function NextPlayPausePrevious() {
    const player = usePlayer();
    const [playing, ended] = usePlayerState();
    const states = usePlayerNavigation();

    const Icon = ended ? LucideRotateCcw : playing ? LucidePause : LucidePlay;

    const LoopIcon = player.options.loop === 1 ? LucideRepeat1 : LucideRepeat;

    return (
        <>
            <RoundButton
                size={35}
                className="rounded-full p-2 transition-all"
                disabled={player.queue.length < 2}
                onClick={() => player.shuffleQueue()}
            >
                <LucideShuffle />
            </RoundButton>
            <RoundButton
                size={45}
                className="rounded-full p-2 transition-all"
                disabled={!states.hasPrevious}
                onClick={() => states.previous()}
            >
                <LucideSkipBack />
            </RoundButton>
            <RoundButton
                size={55}
                className="rounded-full p-2 transition-all"
                onClick={() => states.toggle()}
            >
                <Icon fill={!ended ? "currentColor" : "none"} />
            </RoundButton>
            <RoundButton
                size={45}
                className="rounded-full p-2 transition-all"
                disabled={!states.hasNext}
                onClick={() => states.next()}
            >
                <LucideSkipForward />
            </RoundButton>
            <RoundButton
                size={35}
                className={cn("rounded-full p-2 transition-all", {
                    "text-primary": player.options.loop !== 0,
                })}
                onClick={() => {
                    player.updateOptions({
                        loop:
                            player.options.loop === 0
                                ? 2
                                : player.options.loop === 2
                                  ? 1
                                  : 0,
                    });
                }}
            >
                <LoopIcon />
            </RoundButton>
        </>
    );
}
