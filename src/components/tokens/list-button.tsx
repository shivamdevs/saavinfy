"use client";

import { MediaSong } from "@/types/media";
import React from "react";
import { MonoSpan } from "./typography";
import PlayButton from "./play";
import { cn } from "@/lib/utils";
import usePlayer from "@/contexts/player";
import useLibrary from "@/contexts/library";

export type SongListButtonProps = {
    song: MediaSong;
    index: number;
    asId?: boolean;
    addToSearch?: {
        query: string;
        type: string;
    };
};
export default function SongListButton({
    index,
    song,
    asId,
    addToSearch,
}: SongListButtonProps) {
    const player = usePlayer();
    const playingThisSong = player.playingSong(song?.id ?? "");

    const library = useLibrary();

    return (
        <>
            <MonoSpan
                className={cn("group-hover:hidden", {
                    hidden: playingThisSong,
                })}
            >
                {index + 1}
            </MonoSpan>
            <PlayButton
                song={asId ? undefined : song}
                songId={asId ? song.id : undefined}
                className={cn("group-hover:flex", {
                    hidden: !playingThisSong,
                })}
                onClickNext={() => {
                    if (addToSearch) {
                        library.addSearch(addToSearch.query, addToSearch.type);
                    }
                }}
                plain
                size={15}
            />
        </>
    );
}
