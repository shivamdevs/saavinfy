"use client";

import { MediaSong } from "@/types/media";
import React from "react";
import RoundButton from "./button";
import usePlayer from "@/contexts/player";
import useFetchAndPlay from "@/contexts/hooks/use-play";
import useLibrary from "@/contexts/library";
import Lucide from "../lucide";

export type QueueProps = {
    song: MediaSong;
    asQueue?: boolean;
    asId?: boolean;
    addToSearch?: {
        query: string;
        type: string;
    };
};

function AddToQueue({ song, asQueue, asId, addToSearch }: QueueProps) {
    const player = usePlayer();
    const library = useLibrary();
    const fetchPlay = useFetchAndPlay();

    const Icon = asQueue ? Lucide.X : Lucide.ListPlus;

    const inQueue = player.queue.some((s) => s.id === song.id);

    return (
        <RoundButton
            className="[&:not(:disabled)]:hover:bg-primary-foreground/10 relative z-10 disabled:invisible"
            size={32}
            disabled={!asQueue && inQueue}
            onClick={() => {
                if (inQueue) {
                    player.removeSong(song);
                } else {
                    if (asId) {
                        fetchPlay.song(song.id, true);
                    } else {
                        player.addSong(song);
                    }
                }

                if (addToSearch) {
                    library.addSearch(addToSearch.query, addToSearch.type);
                }
            }}
        >
            <Icon size={16} />
        </RoundButton>
    );
}

export default AddToQueue;
