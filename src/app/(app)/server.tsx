import React from "react";
import { PlayerProvider } from "@/contexts/player";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import crypt from "@/lib/crypt";
import { serverCall } from "@/lib/call";
import { Endpoints } from "@/config/endpoints";
import { MediaSong } from "@/types/media";
import ErrorBox from "@/components/layout/error";
import { CallResponse } from "@/modules/call";
import { PlayerCachePush } from "@/types/opts";
import { LibraryCache } from "@/types/library";
import { LibraryProvider } from "@/contexts/library";
import { libraryCacheLimiter, playerCacheLimiter } from "@/lib/short";

async function ServerLayout({ children }: React.PropsWithChildren) {
    const playerData = getPlayerData();
    const libraryData = getLibraryData();

    const songsData = await getSongs(playerData?.queue as string[]);

    return (
        <ErrorBox data={songsData}>
            <PlayerProvider
                data={{
                    current: playerData?.current ?? null,
                    queue: songsData.data as MediaSong[],
                    time: playerData?.time ?? 0,
                    volume: playerData?.volume ?? 1,
                    options: {
                        loop: playerData?.options.loop ?? 0,
                        muted: playerData?.options.muted ?? false,
                        panel: playerData?.options.panel ?? undefined,
                    },
                }}
            >
                <LibraryProvider data={libraryData}>{children}</LibraryProvider>
            </PlayerProvider>
        </ErrorBox>
    );
}

export default ServerLayout;

function getPlayerData() {
    const bucket = getCookie("aPqL", { cookies });

    if (!bucket) {
        return playerCacheLimiter.fallback;
    }

    const decrypted = crypt.decrypt(bucket);

    if (!decrypted) {
        return playerCacheLimiter.fallback;
    }

    return playerCacheLimiter.parse(decrypted) as PlayerCachePush;
}

function getLibraryData() {
    const bucket = getCookie("aPlD", { cookies });

    if (!bucket) {
        return libraryCacheLimiter.fallback;
    }

    const decrypted = crypt.decrypt(bucket);

    if (!decrypted) {
        return libraryCacheLimiter.fallback;
    }

    return libraryCacheLimiter.parse(decrypted) as LibraryCache;
}

async function getSongs(queue?: string[]) {
    if (!queue || queue.length === 0) {
        return new CallResponse<MediaSong[]>([]);
    }

    const data = await serverCall<MediaSong[]>(Endpoints.songsByIds(queue));

    return data;
}
