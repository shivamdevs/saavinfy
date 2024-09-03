import { LibraryCache, LibraryCacheLimited } from "@/types/library";
import { MediaSong } from "@/types/media";
import { PlayerCacheLimited, PlayerCachePush } from "@/types/opts";

class LibraryCacheLimiter {
    limit(data: LibraryCache): LibraryCacheLimited {
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
            f: [
                Math.floor(data.favorites.date / 1000).toString(),
                data.favorites.songs
                    .map((song) =>
                        [song.id, Math.floor(song.date / 1000)].join(":")
                    )
                    .join(";"),
            ]
                .filter((f) => typeof f === "string" && f.length > 0)
                .join(","),
            p: data.playlists
                .map((playlist) =>
                    [
                        playlist.id,
                        encodeURIComponent(playlist.name),
                        Math.floor(playlist.date / 1000),
                        playlist.songs
                            .map((song) =>
                                [song.id, Math.floor(song.date / 1000)].join(
                                    ":"
                                )
                            )
                            .join(";"),
                    ].join("~")
                )
                .join(","),
        };
    }

    parse(data?: LibraryCacheLimited): LibraryCache {
        if (!data) return this.fallback;

        if (!this.validate(data)) return this.fallback;

        const [fD, fS] = data.f.split(",");

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
            favorites: {
                date: fD ? Number(fD) * 1000 : Date.now(),
                songs:
                    ((fS ?? "").split(";") ?? [])
                        .filter((s) => s.length > 0)
                        .map((s) => {
                            const [id, date] = s.split(":");

                            return { id, date: Number(date) * 1000 };
                        }) ?? [],
            },
            playlists: data.p
                .split(",")
                .filter((p) => p.length > 0)
                .map((p) => {
                    const [id, name, date, songs] = p.split("~");

                    return {
                        id,
                        name: decodeURIComponent(name),
                        date: Number(date) * 1000,
                        songs: songs
                            .split(";")
                            .filter((s) => s.length > 0)
                            .map((s) => {
                                const [id, date] = s.split(":");

                                return { id, date: Number(date) * 1000 };
                            }),
                    };
                }),
        };
    }

    private validate(data: LibraryCacheLimited): boolean {
        return (
            typeof data.s === "string" &&
            typeof data.f === "string" &&
            typeof data.p === "string"
        );
    }

    fallback: LibraryCache = {
        searches: [],
        favorites: {
            date: Date.now(),
            songs: [],
        },
        playlists: [],
    };
}

export const libraryCacheLimiter = new LibraryCacheLimiter();

class PlayerCacheLimiter {
    limit(data: PlayerCachePush): PlayerCacheLimited {
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
                ? (data.options.panel.charAt(0) as "q" | "s" | "i")
                : undefined,
        };
    }

    parse(data?: PlayerCacheLimited): PlayerCachePush {
        if (!data) return this.fallback;

        if (!this.validate(data)) return this.fallback;

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
                            : undefined
                    : undefined,
            },
        };
    }

    private validate(data: PlayerCacheLimited): boolean {
        return (
            typeof data.q === "string" &&
            (data.c === undefined || typeof data.c === "number") &&
            typeof data.t === "number" &&
            typeof data.v === "number" &&
            (data._l === undefined || [0, 1, 2].includes(data._l)) &&
            (data._m === undefined || data._m === 1) &&
            (data._p === undefined || ["q", "s", "i"].includes(data._p))
        );
    }

    fallback: PlayerCachePush = {
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
}

export const playerCacheLimiter = new PlayerCacheLimiter();
