"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { usePlayerOptions, usePlayerVolume } from "@/contexts/player/hooks";
import { cn } from "@/lib/utils";
import Tippy from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import Lucide from "@/components/lucide";

export default function PlayerVolume() {
    const options = usePlayerOptions();

    const [volume, setVolume, isMuted] = usePlayerVolume();

    const VolumeIcon = isMuted
        ? Lucide.VolumeX
        : volume === 0
          ? Lucide.Volume
          : volume < 0.5
            ? Lucide.Volume1
            : Lucide.Volume2;

    return (
        <div className="flex-center gap-1">
            <Tippy content={volume === 0 ? "Fix" : isMuted ? "Unmute" : "Mute"}>
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className={cn("rounded-full", {
                        "!text-primary": isMuted,
                    })}
                    onClick={() => {
                        if (volume === 0) {
                            setVolume(0.1);
                        } else {
                            options.update({ muted: !isMuted });
                        }
                    }}
                >
                    <VolumeIcon size={16} />
                </Button>
            </Tippy>
            <Slider
                min={0}
                max={1}
                step={0.1}
                value={[volume]}
                disabled={isMuted}
                onValueChange={([volume]) => {
                    setVolume(volume);
                }}
                className="w-20"
            />
        </div>
    );
}
