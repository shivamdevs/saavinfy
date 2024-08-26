"use client";

import React from "react";
import PlayerContext, { useHook as usePlayer } from "./context";
import usePlayerOps from "./operations";
import { PlayerCache } from "@/types/opts";

export default usePlayer;

export type PlayerProviderProps = React.PropsWithChildren<{
    data: PlayerCache;
}>;

export function PlayerProvider({ children, data }: PlayerProviderProps) {
    const operations = usePlayerOps(data);

    return (
        <PlayerContext.Provider value={operations}>
            {children}
        </PlayerContext.Provider>
    );
}

export { PlayerContext, usePlayer };
