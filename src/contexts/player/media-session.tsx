"use client";

import { useEffect } from "react";
import usePlayer from ".";
import { usePlayerNavigation } from "./hooks";

export default function MediaSessionHook() {
    const player = usePlayer();
    const navigate = usePlayerNavigation();

    const { currentSong } = player;

    useEffect(() => {
        const HAS_MEDIA_SESSION =
            typeof window !== "undefined" &&
            window.navigator &&
            "mediaSession" in window.navigator;

        function removeMediaSession() {
            if (!HAS_MEDIA_SESSION) {
                return;
            }

            const { mediaSession } = window.navigator;

            mediaSession.metadata = null;
            mediaSession.setActionHandler("play", null);
            mediaSession.setActionHandler("pause", null);
            mediaSession.setActionHandler("previoustrack", null);
            mediaSession.setActionHandler("nexttrack", null);
        }

        if (!HAS_MEDIA_SESSION) {
            return removeMediaSession;
        }

        if (!currentSong) {
            return removeMediaSession;
        }

        const { name, artists, album, image } = currentSong;

        const { mediaSession } = window.navigator;

        mediaSession.metadata = new window.MediaMetadata({
            title: name,
            artist: artists.primary.map((a) => a.name).join(", "),
            album: album.name,
            artwork: image.map((i) => ({
                src: i.url,
                sizes: i.quality,
                type: "image/jpeg",
            })),
        });

        mediaSession.setActionHandler("play", () => {
            navigate.play();
        });

        mediaSession.setActionHandler("pause", () => {
            navigate.pause();
        });

        mediaSession.setActionHandler(
            "previoustrack",
            navigate.hasPrevious ? navigate.previous : null
        );

        mediaSession.setActionHandler(
            "nexttrack",
            navigate.hasNext ? navigate.next : null
        );

        return removeMediaSession;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        currentSong,
        navigate.hasNext,
        navigate.hasPrevious,
        navigate.next,
        navigate.pause,
        navigate.play,
    ]);

    return null;
}
