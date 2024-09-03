import { MediaSong } from "./media";

export type PlayerCache = {
    queue: MediaSong[];
    current: string | null;
    time: number;
    volume: number;

    options: PlayerOptions;
};

export type PlayerCachePush = PlayerCache & {
    queue: MediaSong[] | string[];
};

export type PlayerCacheLimited = {
    q: string;
    c?: number;
    t: number;
    v: number;
    _l?: 1 | 2;
    _m?: 1;
    _p?: "q" | "s" | "i";
};

export type PlayerOptions = {
    loop: 0 | 1 | 2;
    muted: boolean;
    panel: PlayerPanel;
};

export type PlayerPanel = "queue" | "settings" | "info" | undefined;
