"use client";

import Entity from "@/components/tokens/entity";
import { getSongArtists } from "@/components/tokens/list";
import { Text } from "@/components/tokens/typography";
import usePlayer from "@/contexts/player";
import Image from "next/image";

function SongCard() {
    const player = usePlayer();

    const song = player.currentSong;

    if (!song) return null;

    return (
        <div className="flex items-center gap-4 flex-1">
            <Image
                src={song.image.at(-1)?.url!}
                alt={song.title ?? song.name}
                width={100}
                height={100}
                className="w-12 h-12 rounded-lg"
            />
            <div>
                <Text className="font-semibold line-clamp-1">
                    <Entity html={song.name ?? song.title} />
                </Text>
                <Text className="text-sm text-secondary-foreground line-clamp-1">
                    {getSongArtists(song.artists?.primary, song.description)}
                </Text>
            </div>
        </div>
    );
}

export default SongCard;
