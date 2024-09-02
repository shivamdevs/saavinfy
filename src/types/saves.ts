import {
    LibraryFavorite,
    LibraryPlaylist,
    LibrarySearchHistory,
} from "./library";
import { MediaSong } from "./media";

export type SavedLimitedPlayer = {
    q: string;
    c?: number;
    t: number;
    v: number;
    _l?: 1 | 2;
    _m?: 1;
    _p?: "q" | "s" | "i";
};

export type SavedPlayer<Q = MediaSong> = {
    queue: Q[];
    current: string | null;
    time: number;
    volume: number;

    options: SavedPlayerOptions;
};

export type SavedPlayerOptions = {
    loop: 0 | 1 | 2;
    muted: boolean;
    panel: SavedPlayerPanel;
};

export type SavedPlayerPanel = "queue" | "settings" | "info" | undefined;

export type SavedLimitedLibrary = {
    s: string;
    f: string;
    p: string;
};

export type SavedLibrary = {
    searches: LibrarySearchHistory[];
    favorites: LibraryFavorite;
    playlists: LibraryPlaylist[];
};
