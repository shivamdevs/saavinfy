"use client";

import { Slider } from "@/components/ui/slider";
import usePlayer from "@/contexts/player";
import { usePlayerBuffer, usePlayerTiming } from "@/contexts/player/hooks";
import { cn } from "@/lib/utils";
import React from "react";

export default function PlayerTrack({ className }: { className?: string }) {
    const player = usePlayer();
    const [currentTime, totalDuration] = usePlayerTiming();
    const bufferPercent = usePlayerBuffer();

    return (
        <div className={cn("absolute inset-0 bottom-auto h-4", className)}>
            <span
                className="absolute inset-0 top-1.5 h-1 bg-primary/20 transition-all"
                style={{
                    right: `${100 - bufferPercent}%`,
                }}
            />
            <Slider
                className="absolute inset-0"
                min={0}
                max={totalDuration}
                value={[currentTime]}
                buffer
                onValueChange={([seek]: number[]) => {
                    player.element!.currentTime = seek;
                    player.setCurrentTime(seek);
                }}
            />
        </div>
    );
}
