"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { MediaSong } from "@/types/media";
import usePlayer from "@/contexts/player";
import useFetchAndPlay from "@/contexts/hooks/use-play";
import Lucide from "../lucide";

export type PlayButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: number;
    plain?: boolean;
    song?: MediaSong;
    songId?: string;
    asQueue?: boolean;
    onClickNext?: () => Promise<void> | void;

    className?: string;
    style?: React.CSSProperties;
};

function PlayButton({
    size = 24,
    className,
    style,
    plain,
    song,
    songId,
    asQueue,
    onClickNext,
    ...props
}: PlayButtonProps) {
    const player = usePlayer();
    const fetchPlay = useFetchAndPlay();

    const playingThisSong = player.playingSong(songId ?? song?.id ?? "");
    const isPlaying = player.playing;

    const Icon = playingThisSong && isPlaying ? Lucide.Pause : Lucide.Play;

    return (
        <button
            className={cn(
                "w-10 h-10 rounded-full flex-center",
                {
                    "bg-primary": !plain,
                    "hover:bg-primary-light focus-visible:bg-primary-light":
                        !plain,
                    "hover:shadow focus-visible:shadow": !plain,
                    "absolute bottom-2 right-2 transition-all z-10": !plain,
                    "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100":
                        !plain && !(isPlaying && playingThisSong),
                    "-mb-2 group-focus-within:mb-0 group-hover:mb-0":
                        !plain && !(isPlaying && playingThisSong),
                    "text-primary": playingThisSong && plain,
                },
                className
            )}
            onClick={() => {
                if (song || songId) {
                    if (playingThisSong) {
                        if (isPlaying) {
                            player.pause();
                        } else {
                            player.play();
                        }
                    } else {
                        if (asQueue) {
                            if (songId) {
                                fetchPlay.song(songId, true);
                            } else if (song) {
                                player.addSong(song, true);
                            }
                        } else {
                            if (songId) {
                                fetchPlay.song(songId);
                            } else if (song) {
                                player.play(song);
                            }
                        }
                    }
                }

                onClickNext?.();
            }}
            style={{
                width: size,
                height: size,
                ...(style ?? {}),
            }}
            {...props}
        >
            <Icon
                className={cn({
                    "w-2/5 h-2/5": !plain,
                })}
                fill="currentColor"
            />
        </button>
    );
}

export default PlayButton;
