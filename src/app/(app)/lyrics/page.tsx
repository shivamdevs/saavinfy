"use client";

import { Endpoints } from "@/config/endpoints";
import usePlayer from "@/contexts/player";
import React from "react";
import useSWR from "swr";

export default function Page() {
    const player = usePlayer();

    const song = player.currentSong;

    const { data } = useSWR(() => (song ? Endpoints.lyrics(song.id) : null));

    console.log(data);

    if (!song) return null;

    return <>Lyrics</>;
}
