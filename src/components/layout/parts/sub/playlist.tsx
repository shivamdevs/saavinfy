"use client";

import React from "react";
import { LibraryPlaylist } from "@/types/library";
import useLibrary from "@/contexts/library";
import Link from "next/link";
import { formatPlural } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { GradientColors } from "@/lib/colors";
import Lucide from "@/components/lucide";
import { Card } from "@/components/ui/card";
import useAgo from "@/contexts/hooks/use-ago";

export default function PartPlaylist() {
    const { favorites, playlists } = useLibrary();

    if (!favorites) {
        return null;
    }

    return (
        <>
            <Playlist {...favorites} />
            <Separator className="my-2" />
            {playlists.map((playlist) => (
                <Playlist key={playlist.id} {...playlist} />
            ))}
        </>
    );
}

function Playlist({
    id,
    name,
    modifiedAt,
    songs,
    isFavorite,

    // isPublic,
}: LibraryPlaylist) {
    const colors = GradientColors.from(id);

    const Icon = isFavorite ? Lucide.Heart : Lucide.Music2;

    const ago = useAgo();

    return (
        <Card asLink className="border-0">
            <Link
                href={`/playlist/${id}`}
                className="flex p-2 gap-4 items-center"
            >
                <span
                    className="size-10 rounded-lg flex-center"
                    style={{
                        backgroundImage: `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`,
                    }}
                >
                    <Icon size={22} className="text-white" />
                </span>
                <div className="flex flex-col">
                    <p className="-mb-1">{name}</p>
                    <p className="text-sm text-secondary-foreground">
                        {songs.length} {formatPlural(songs.length, "song")} •{" "}
                        {ago(modifiedAt.getTime())}
                    </p>
                </div>
            </Link>
        </Card>
    );
}
