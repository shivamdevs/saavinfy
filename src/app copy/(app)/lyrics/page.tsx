"use client";

import Entity from "@/components/tokens/entity";
import { Heading, Text } from "@/components/tokens/typography";
import { Endpoints } from "@/config/endpoints";
import usePlayer from "@/contexts/player";
import { CallResponse } from "@/lib/call";
import { MediaLyrics } from "@/types/media";
import React from "react";
import useSWR from "swr";

export default function Page() {
    const player = usePlayer();

    const song = player.currentSong;

    const res = useSWR<CallResponse<MediaLyrics>>(() =>
        song ? Endpoints.lyrics(song.id) : null
    );

    const lyrics = res.data?.data;

    if (res.isLoading || res.isValidating) return null;

    if (!song || !lyrics)
        return (
            <div className="flex-center flex-col flex-1 pt-20">
                <Heading
                    level={2}
                    className="text-3xl text-secondary-foreground font-semibold"
                >
                    No lyrics found
                </Heading>
            </div>
        );

    return (
        <div className="flex-1 p-10 space-y-6">
            {lyrics.lyrics.split("<br>").map((line, i) => (
                <Heading key={i} level={3} className="text-5xl">
                    <Entity html={line} />
                </Heading>
            ))}
            <Text className="text-secondary-foreground pt-10">
                <Entity html={lyrics.copyright.replace("<br>", "\n")} />
            </Text>
        </div>
    );
}
