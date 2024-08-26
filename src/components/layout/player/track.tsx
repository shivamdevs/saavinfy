import InputRange from "./input";
import { TimeSpan } from "@/components/tokens/typography";
import usePlayer from "@/contexts/player";
import { usePlayerBuffer, usePlayerTiming } from "@/contexts/player/hooks";
import { useEffect } from "react";

export default function TrackSeeker() {
    const player = usePlayer();
    const [currentTime, totalDuration] = usePlayerTiming();

    const bufferPercent = usePlayerBuffer();

    return (
        <div className="flex flex-nowrap w-full items-center text-secondary-foreground group-[.exp]:text-white font-black text-sm tracking-widest min-h-[16px]">
            <TimeSpan className="min-w-[60px]" time={currentTime} />
            <div className="range-box">
                <div
                    className="buffer"
                    style={{ right: `${100 - bufferPercent}%` }}
                ></div>
                <InputRange
                    max={totalDuration}
                    value={currentTime}
                    onChange={(seek: number) => {
                        player.element!.currentTime = seek;
                        player.setCurrentTime(seek);
                    }}
                />
            </div>
            <TimeSpan
                className="min-w-[60px] text-right"
                time={totalDuration}
            />
        </div>
    );
}
