/* eslint-disable no-unused-vars */
import { MediaSong } from "@/types/media";
import { PlayerOptions } from "@/types/opts";
import React from "react";

export type ContextType = {
    element: HTMLAudioElement | undefined;

    current: string | null;
    currentSong: MediaSong | undefined;
    updateCurrent: (song: MediaSong) => Promise<void>;

    queue: Array<MediaSong>;
    shuffleQueue: () => void;

    play: (song?: MediaSong) => Promise<void>;
    pause: () => void;
    toggle: () => void;

    addSong: (song: MediaSong, start?: boolean, clear?: boolean) => void;
    getSong: (song: MediaSong | string) => MediaSong | undefined;
    hasSong: (song: MediaSong | string) => boolean;

    /**
     * Remove a song from the queue.
     * @param song The song to remove.
     * @returns void
     */
    removeSong: (song: MediaSong | string) => void;
    addSongs: (
        songs: MediaSong[],

        start?: boolean,

        clear?: boolean
    ) => Promise<void>;
    playingSong: (song?: MediaSong | string) => boolean;

    ended: boolean;
    playing: boolean;

    duration: number;
    currentTime: number;
    setCurrentTime: React.Dispatch<React.SetStateAction<number>>;

    volume: number;
    setVolume: React.Dispatch<React.SetStateAction<number>>;

    options: PlayerOptions;
    updateOptions: (
        opts:
            | Partial<PlayerOptions>
            | ((prev: PlayerOptions) => Partial<PlayerOptions>)
    ) => void;

    fullScreen: boolean;
    setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const contextDefaultValue: ContextType = {
    element: undefined,

    current: null,
    currentSong: undefined,
    updateCurrent: async () => {},

    queue: [],
    shuffleQueue: () => {},

    play: async () => {},
    pause: () => {},
    toggle: () => {},
    addSong: async () => {},
    getSong: () => undefined,
    hasSong: () => false,
    addSongs: async () => {},
    removeSong: () => {},
    playingSong: () => false,

    ended: false,
    playing: false,

    duration: 0,
    currentTime: 0,
    setCurrentTime: () => {},

    volume: 1,
    setVolume: () => {},

    options: {
        loop: 0,
        muted: false,
        panel: undefined,
    },
    updateOptions: () => {},

    fullScreen: false,
    setFullScreen: () => {},
};

export const ContextElement =
    React.createContext<ContextType>(contextDefaultValue);

ContextElement.displayName = "Player Manager";

export function useHook(): ContextType {
    const context = React.useContext(ContextElement);

    if (!context)
        throw new Error(
            `Unable to access ${ContextElement.displayName} Context API.`
        );

    return context;
}

export default ContextElement;
