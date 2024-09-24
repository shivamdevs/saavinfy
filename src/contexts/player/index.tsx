"use client";

import React, { useEffect } from "react";
import PlayerContext, { ContextType, useHook as usePlayer } from "./context";
import usePlayerOps from "./operations";
import { SavedPlayer } from "@/types/saves";
import MediaSessionHook from "./media-session";

export default usePlayer;

export type PlayerProviderProps = React.PropsWithChildren<{
    data: SavedPlayer;
}>;

export function PlayerProvider({ children, data }: PlayerProviderProps) {
    // TODO: This is a hack to expose the player operations to the window object
    // TODO: so that it can be used in the browser console. This is useful for debugging
    // TODO: and
    // TODO: testing. This should be removed in production.
    const operations = usePlayerOps(data);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        (window as unknown as { player: ContextType }).player = operations;
    }, [operations]);

    return (
        <PlayerContext.Provider value={operations}>
            {children}
            <MediaSessionHook />
        </PlayerContext.Provider>
    );
}

export { PlayerContext, usePlayer };
