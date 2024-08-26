"use client";

import React from "react";
import Image from "next/image";
import { MediaSong } from "@/types/media";
import PlayButton from "./play";
import { cn } from "@/lib/utils";
import useLibrary from "@/contexts/library";

export interface ListImageProps {
    song: MediaSong;
    playinline?: boolean;
    asQueue?: boolean;
    asId?: boolean;
    addToSearch?: {
        query: string;
        type: string;
    };
}

export default function ListImage({
    song,
    playinline,
    asQueue,
    asId,
    addToSearch,
}: ListImageProps) {
    const library = useLibrary();

    return (
        <div className="w-12 h-12 relative overflow-hidden rounded-lg min-w-12">
            <Image
                src={song.image.at(-1)?.url!}
                alt={song.title ?? song.name}
                width={100}
                height={100}
                className="absolute inset-0 object-cover"
            />
            {playinline && (
                <PlayButton
                    song={asId ? undefined : song}
                    songId={asId ? song.id : undefined}
                    plain
                    onClickNext={() => {
                        if (addToSearch) {
                            library.addSearch(
                                addToSearch.query,
                                addToSearch.type
                            );
                        }
                    }}
                    asQueue={asQueue}
                    size={48}
                    className={cn(
                        "absolute inset-0 rounded-lg flex-center",
                        "bg-black/40 backdrop-blur-sm",
                        "group-hover:flex hidden p-4 transition-all"
                    )}
                />
            )}
        </div>
    );
}
