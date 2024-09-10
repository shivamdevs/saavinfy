"use client";

import React from "react";
import usePlayer from "@/contexts/player";
import { useParams, useRouter } from "next/navigation";

export default function LyricsSwap() {
    const player = usePlayer();
    const params = useParams<{ id: string }>();
    const router = useRouter();

    React.useEffect(() => {
        if (player.currentSong && params.id !== player.currentSong.id) {
            router.replace(`/lyrics/${player.currentSong.id}`);
        }
    }, [params.id, player.currentSong, router]);

    return null;
}
