import React from "react";
import { ContextType } from "./context";
import crypt from "@/lib/crypt";
import { setCookie } from "cookies-next";
import { formatPlural, uuid } from "@/lib/utils";
import { Config } from "@/config";
import Limiter from "@/helpers/limiter";
import { LibraryData } from "@/types/saves";
import {
    LibraryHistory,
    LibraryPlaylistEditor,
    LibrarySong,
} from "@/types/library";
import toast from "react-hot-toast";
import { LibRar } from "@/helpers/librar";
import useStack from "../stack";
import Parser from "@/helpers/parser";

function useOps(data: LibraryData) {
    const [libraryData, setLibraryData] = React.useState<LibraryData>(data);

    const { newStack } = useStack();

    React.useLayoutEffect(() => {
        const data = Limiter.limitLibrary(libraryData);

        // eslint-disable-next-line no-console
        console.log(
            "Library data updated",
            libraryData,
            data,
            Limiter.parseLibrary(data)
        );

        setCookie(Config.cookies.keys.library, crypt.encrypt(data), {
            maxAge: Config.cookies.maxAge,
        });

        setCookie(`${Config.cookies.keys.library}.dev`, data, {
            maxAge: Config.cookies.maxAge,
        });
    }, [libraryData]);

    const addSearch = React.useCallback(
        (query: string, type: string) => {
            const search = libraryData.searches.find(
                (search) => search.query === query && search.type === type
            );

            if (search) {
                setLibraryData((prev) => ({
                    ...prev,
                    searches: prev.searches.map((s) =>
                        s.id === search.id ? { ...s, date: Date.now() } : s
                    ),
                }));
            } else {
                setLibraryData((prev) => ({
                    ...prev,
                    searches: [
                        ...prev.searches,
                        {
                            id: uuid(6),
                            query,
                            type,
                            date: Date.now(),
                        },
                    ]
                        .sort((a, b) => b.date - a.date)
                        .slice(0, 20),
                }));
            }
        },
        [libraryData]
    );

    const removeSearch = React.useCallback((id: string) => {
        setLibraryData((prev) => ({
            ...prev,
            searches: prev.searches.filter((search) => search.id !== id),
        }));
    }, []);

    const clearSearches = React.useCallback(() => {
        setLibraryData((prev) => ({
            ...prev,
            searches: [],
        }));
    }, []);

    const addFavorite = React.useCallback(
        (ids: string | string[], name?: string) => {
            if (typeof ids === "string") {
                ids = [ids];
            }

            if (!libraryData.favorites) {
                return toast.error("You need to login to add favorites");
            }

            const stack = newStack(
                `favorites/add/${ids.join(",")}`,
                `Adding ${name ?? ""} to favorites.`,
                { type: "loading", mergeWithPrevious: true }
            );

            setLibraryData((prev) => ({
                ...prev,

                favorites: {
                    ...prev.favorites!,
                    modifiedAt: new Date(),
                    songs: [
                        ...prev.favorites!.songs,
                        ...ids.map(
                            (id): LibrarySong => ({
                                id,
                                song: id,
                                createdAt: new Date(),
                                playlistId: prev.favorites!.id,
                            })
                        ),
                    ],
                },
            }));

            LibRar.playlistSongs(libraryData.favorites.id, ids, "PUT").then(
                (res) => {
                    if (!res.success) {
                        stack.error(`Failed to add to favorites.`, res.message);

                        return toast.error(res.message);
                    }

                    setLibraryData((prev) => ({
                        ...prev,
                        favorites: {
                            ...prev.favorites!,
                            modifiedAt: new Date(res.data.modifiedAt),
                            songs: res.data.songs,
                        },
                    }));

                    stack.success(`Added ${name ?? ""} to favorites.`);
                }
            );
        },
        [libraryData.favorites, newStack]
    );

    const removeFavorite = React.useCallback(
        (ids: string | string[], name?: string) => {
            if (typeof ids === "string") {
                ids = [ids];
            }

            if (!libraryData.favorites) {
                return;
            }

            setLibraryData((prev) => ({
                ...prev,

                favorites: {
                    ...prev.favorites!,
                    modifiedAt: new Date(),
                    songs: prev.favorites!.songs.filter(
                        (song) => !ids.includes(song.song)
                    ),
                },
            }));

            const stack = newStack(
                `favorites/remove/${ids.join(",")}`,
                `Removing ${name ?? ""} from favorites.`,
                { type: "loading", mergeWithPrevious: true }
            );

            LibRar.playlistSongs(libraryData.favorites.id, ids, "DELETE").then(
                (res) => {
                    if (!res.success) {
                        stack.error(
                            `Failed to remove from favorites.`,
                            res.message
                        );

                        return toast.error(res.message);
                    }

                    setLibraryData((prev) => ({
                        ...prev,
                        favorites: {
                            ...prev.favorites!,
                            modifiedAt: new Date(res.data.modifiedAt),
                            songs: res.data.songs,
                        },
                    }));

                    stack.success(`Removed ${name ?? ""} from favorites.`);
                }
            );
        },
        [libraryData.favorites, newStack]
    );

    const isFavorite = React.useCallback(
        (id: string) => {
            return libraryData.favorites?.songs.some(
                (song) => song.song === id
            );
        },
        [libraryData.favorites]
    );

    const toggleFavorite = React.useCallback(
        (id: string, name?: string) => {
            if (isFavorite(id)) {
                removeFavorite(id, name ? Parser.entity(name) : undefined);
            } else {
                addFavorite(id, name ? Parser.entity(name) : undefined);
            }
        },
        [isFavorite, addFavorite, removeFavorite]
    );

    const createPlaylist = React.useCallback(() =>
        // name: string
        {
            setLibraryData((prev) => ({
                ...prev,

                // playlists: [
                //     ...prev.playlists,
                //     {
                //         id: uuid(6),
                //         name,
                //         date: Date.now(),
                //         songs: [],
                //     },
                // ],
            }));
        }, []);

    const removePlaylist = React.useCallback((id: string) => {
        setLibraryData((prev) => ({
            ...prev,
            playlists: prev.playlists.filter((playlist) => playlist.id !== id),
        }));
    }, []);

    const renamePlaylist = React.useCallback((id: string, name: string) => {
        setLibraryData((prev) => ({
            ...prev,
            playlists: prev.playlists.map((playlist) =>
                playlist.id === id ? { ...playlist, name } : playlist
            ),
        }));
    }, []);

    const addSongsToPlaylist = React.useCallback(
        (id: string, songs: string | string[]) => {
            if (typeof songs === "string") {
                songs = [songs];
            }

            setLibraryData((prev) => ({
                ...prev,

                // playlists: prev.playlists.map((playlist) =>
                //     playlist.id === id
                //         ? {
                //               ...playlist,
                //               songs: [
                //                   ...playlist.songs,
                //                   ...songs.map((song) => ({
                //                       id: song,
                //                       date: Date.now(),
                //                   })),
                //               ],
                //           }
                //         : playlist
                // ),
            }));
        },
        []
    );

    const removeSongsFromPlaylist = React.useCallback(
        (id: string, songs: string | string[]) => {
            if (typeof songs === "string") {
                songs = [songs];
            }

            setLibraryData((prev) => ({
                ...prev,
                playlists: prev.playlists.map((playlist) =>
                    playlist.id === id
                        ? {
                              ...playlist,
                              songs: playlist.songs.filter(
                                  (song) => !songs.includes(song.id)
                              ),
                          }
                        : playlist
                ),
            }));
        },
        []
    );

    const addHistory = React.useCallback(
        (ids: string | string[]) => {
            if (typeof ids === "string") {
                ids = [ids];
            }

            setLibraryData((prev) => ({
                ...prev,
                history: [
                    ...prev.history,
                    ...ids.map(
                        (id): LibraryHistory => ({
                            song: id,
                            date: Date.now(),
                        })
                    ),
                ]
                    .filter(
                        (h, i, a) =>
                            a.findIndex((h2) => h2.song === h.song) === i
                    )
                    .sort((a, b) => b.date - a.date)
                    .slice(0, 20),
            }));

            if (!libraryData.favorites) {
                return;
            }

            const stack = newStack(`history/update`, `Updating history.`, {
                type: "loading",
                mergeWithPrevious: true,
            });

            LibRar.historySongs(ids, "PUT").then((res) => {
                if (!res.success) {
                    stack.error(`Failed to update history.`, res.message);

                    return toast.error(res.message);
                }

                stack.success(`Updated history.`);
            });
        },
        [libraryData.favorites, newStack]
    );

    const removeHistory = React.useCallback(
        (ids: string | string[]) => {
            if (typeof ids === "string") {
                ids = [ids];
            }

            setLibraryData((prev) => ({
                ...prev,
                history: prev.history.filter(
                    (history) => !ids.includes(history.song)
                ),
            }));

            if (!libraryData.favorites) {
                return;
            }

            const stack = newStack(
                `history/remove/${ids.join(",")}`,
                `Removing ${ids.length} ${formatPlural(ids.length, "song")} from history.`,
                { type: "loading" }
            );

            LibRar.historySongs(ids, "DELETE").then((res) => {
                if (!res.success) {
                    stack.error(
                        `Failed to remove ${ids.length} ${formatPlural(
                            ids.length,
                            "song"
                        )} from history.`,
                        res.message
                    );

                    return toast.error(res.message);
                }

                stack.success(
                    `Removed ${ids.length} ${formatPlural(
                        ids.length,
                        "song"
                    )} from history.`
                );
            });
        },
        [libraryData.favorites, newStack]
    );

    const clearHistory = React.useCallback(() => {
        setLibraryData((prev) => ({
            ...prev,
            history: [],
        }));

        if (!libraryData.favorites) {
            return;
        }

        LibRar.historySongs([], "DELETE", true).then((res) => {
            if (!res.success) {
                return toast.error(res.message);
            }

            toast.success("Added to history");
        });
    }, [libraryData.favorites]);

    const [playlistEditor, setPlaylistEditor] =
        React.useState<LibraryPlaylistEditor>(null);

    return {
        log: libraryData,

        searches: libraryData.searches,
        addSearch,
        removeSearch,
        clearSearches,

        favorites: libraryData.favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,

        playlists: libraryData.playlists,
        createPlaylist,
        removePlaylist,
        renamePlaylist,
        addSongsToPlaylist,
        removeSongsFromPlaylist,

        history: libraryData.history,
        addHistory,
        removeHistory,
        clearHistory,

        playlistEditor,
        setPlaylistEditor,
    } as ContextType;
}

export default useOps;
