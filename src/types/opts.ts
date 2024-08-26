import { MediaSong } from "./media";

export type PlayerCache = {
    queue: MediaSong[];
    current: string | null;
    time: number;
    volume: number;

    options: PlayerOptions;
};

export type PlayerCachePush = PlayerCache & {
    queue: string[];
};

export type PlayerOptions = {
    loop: 0 | 1 | 2;
    muted: boolean;
    panel: PlayerPanel;
};

export type PlayerPanel = "queue" | "lyrics" | "settings" | "info" | undefined;
