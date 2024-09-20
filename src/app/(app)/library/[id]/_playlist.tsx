import BlockAgo from "@/components/blocks/ago";
import { SongList } from "@/components/blocks/song";
import Lucide from "@/components/lucide";
import { Button } from "@/components/ui/button";
import { GradientColors } from "@/lib/colors";
import { cn, formatPlural } from "@/lib/utils";
import { MediaSong } from "@/types/media";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import React from "react";

export default function LibraryPlaylist({
    songs,
    user,
    playlist,
}: {
    songs: MediaSong[];
    user: User & { user_metadata: { full_name?: string } };
    playlist: {
        id: string;
        name: string;
        createdAt: Date;
        modifiedAt: Date;
        isFavorite: boolean;
        isPublic: boolean;
    };
}) {
    const colors = GradientColors.from(playlist.id);
    const Icon = playlist.isFavorite ? Lucide.Heart : Lucide.Music2;

    return (
        <div
            className={"w-full"}
            style={{
                backgroundImage: `linear-gradient(215deg, ${colors[0]}, ${colors[1]})`,
            }}
        >
            <div className="p-10 flex items-end gap-10">
                <span
                    className="size-40 rounded-3xl flex-center shadow-2xl border-4 border-border"
                    style={{
                        backgroundImage: `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`,
                    }}
                >
                    <Icon size={80} className="text-white" />
                </span>
                <div className="flex-col gap-4">
                    <h2 className="">
                        <BlockAgo time={playlist.modifiedAt} /> • Created on{" "}
                        {playlist.createdAt.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </h2>
                    <h3 className="text-5xl font-semibold">{playlist.name}</h3>
                    <h4 className="">
                        A playlist by
                        <Button variant="link" asChild className="p-0">
                            <Link
                                href={`/profile/${user.id}`}
                                className="text-primary-foreground underline font-semibold ml-1"
                            >
                                {user.user_metadata.full_name ??
                                    "Anonymous User"}
                            </Link>
                        </Button>
                        {" • "}
                        {songs.length} {formatPlural(songs.length, "song")}
                    </h4>
                </div>
            </div>
            <div className="p-5 bg-gradient-to-b from-background/10 via-[10rem] via-background to-background min-h-96">
                <div className={cn()}></div>
                <SongList items={songs} />
            </div>
        </div>
    );
}
