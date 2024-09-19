import { MediaSong } from "@/types/media";
import {
    SavedLibrary,
    SavedLimitedLibrary,
    SavedLimitedPlayer,
    SavedPlayer,
} from "@/types/saves";

export default class Limiter {
    public static fallbackPlayer: SavedPlayer = {
        queue: [],
        current: null,
        time: 0,
        volume: 1,
        options: {
            loop: 0,
            muted: false,
            panel: undefined,
        },
    };

    public static fallbackLibrary: SavedLibrary = {
        searches: [],
        history: [],
    };

    get fallbackPlayer(): SavedPlayer {
        return Limiter.fallbackPlayer;
    }

    get fallbackLibrary(): SavedLibrary {
        return Limiter.fallbackLibrary;
    }

    private validatePlayer(data: SavedLimitedPlayer): boolean {
        return (
            typeof data.q === "string" &&
            (data.c === undefined || typeof data.c === "number") &&
            typeof data.t === "number" &&
            typeof data.v === "number" &&
            (data._l === undefined || [0, 1, 2].includes(data._l)) &&
            (data._m === undefined || data._m === 1) &&
            (data._p === undefined || ["q", "s", "i", "n"].includes(data._p))
        );
    }

    private validateLibrary(data: SavedLimitedLibrary): boolean {
        return typeof data.s === "string" && typeof data.h === "string";
    }

    public static parsePlayer(data?: SavedLimitedPlayer): SavedPlayer {
        const l = new Limiter();

        if (!data) {
            return l.fallbackPlayer;
        }

        if (!l.validatePlayer(data)) {
            return l.fallbackPlayer;
        }

        return {
            queue: data.q
                .split(",")
                .filter(
                    (s) => typeof s === "string" && s.length > 0
                ) as unknown as MediaSong[],
            current:
                data.c !== undefined
                    ? data.q
                          .split(",")
                          .filter((s) => typeof s === "string" && s.length > 0)[
                          data.c
                      ]
                    : null,
            time: data.t,
            volume: data.v,
            options: {
                loop: !data._l ? 0 : data._l,
                muted: data._m === 1,
                panel: data._p
                    ? data._p === "q"
                        ? "queue"
                        : data._p === "s"
                          ? "settings"
                          : data._p === "i"
                            ? "info"
                            : data._p === "n"
                              ? "notifications"
                              : undefined
                    : undefined,
            },
        };
    }

    public static parseLibrary(data?: SavedLimitedLibrary): SavedLibrary {
        const l = new Limiter();

        if (!data) {
            return l.fallbackLibrary;
        }

        if (!l.validateLibrary(data)) {
            return l.fallbackLibrary;
        }

        return {
            searches: data.s
                .split(",")
                .filter((s) => s.length > 0)
                .map((s) => {
                    const [id, query, date, type] = s.split(":");

                    return {
                        id,
                        query: decodeURIComponent(query),
                        date: Number(date) * 1000,
                        type:
                            type === "s"
                                ? "songs"
                                : type === "l"
                                  ? "albums"
                                  : type === "r"
                                    ? "artists"
                                    : type === "p"
                                      ? "playlists"
                                      : "",
                    };
                }),
            history: data.h
                .split(",")
                .filter((s) => s.length > 0)
                .map((s) => {
                    const [song, date] = s.split(":");

                    return {
                        song,
                        date: Number(date) * 1000,
                    };
                }),
        };
    }

    public static limitPlayer(data: SavedPlayer): SavedLimitedPlayer {
        return {
            q: data.queue.map((s) => s.id ?? s).join(","),
            c: data.current
                ? (data.queue.findIndex((s) => (s.id ?? s) === data.current) ??
                  undefined)
                : undefined,
            t: data.time,
            v: data.volume,
            _l: data.options.loop || undefined,
            _m: data.options.muted ? 1 : undefined,
            _p: data.options.panel
                ? (data.options.panel.charAt(0) as "q" | "s" | "i" | "n")
                : undefined,
        };
    }

    public static limitLibrary(data: SavedLibrary): SavedLimitedLibrary {
        return {
            s: data.searches
                .map((search) =>
                    [
                        search.id,
                        encodeURIComponent(search.query),
                        Math.floor(search.date / 1000),
                        search.type === "songs"
                            ? "s"
                            : search.type === "albums"
                              ? "l"
                              : search.type === "artists"
                                ? "r"
                                : search.type === "playlists"
                                  ? "p"
                                  : undefined,
                    ].join(":")
                )
                .join(","),
            h: data.history
                .map((history) =>
                    [history.song, Math.floor(history.date / 1000)].join(":")
                )
                .join(","),
        };
    }
}
