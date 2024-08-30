import React from "react";
import { ContextType } from "./context";
import { LibraryCache } from "@/types/library";
import crypt from "@/lib/crypt";
import { setCookie } from "cookies-next";
import { uuid } from "@/lib/utils";
import { libraryCacheLimiter } from "@/lib/short";
import { Config } from "@/config";

function useOps(data: LibraryCache) {
    const [libraryData, setLibraryData] = React.useState<LibraryCache>(data);

    React.useEffect(() => {
        const data = libraryCacheLimiter.limit(libraryData);

        console.log(
            "Library data updated",
            libraryData,
            data,
            libraryCacheLimiter.parse(data)
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
            // Check if the search already exists
            // If it does, update the timestamp

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
                    ],
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

    const addFavorite = React.useCallback((ids: string | string[]) => {
        if (typeof ids === "string") {
            ids = [ids];
        }

        setLibraryData((prev) => ({
            ...prev,
            favorites: {
                date: Date.now(),
                songs: [
                    ...prev.favorites.songs,
                    ...ids.map((id) => ({ id, date: Date.now() })),
                ],
            },
        }));
    }, []);

    const removeFavorite = React.useCallback((ids: string | string[]) => {
        if (typeof ids === "string") {
            ids = [ids];
        }

        setLibraryData((prev) => ({
            ...prev,
            favorites: {
                date: Date.now(),
                songs: prev.favorites.songs.filter(
                    (song) => !ids.includes(song.id)
                ),
            },
        }));
    }, []);

    const isFavorite = React.useCallback(
        (id: string) => {
            return libraryData.favorites.songs.some((song) => song.id === id);
        },
        [libraryData.favorites]
    );

    const toggleFavorite = React.useCallback(
        (id: string) => {
            if (isFavorite(id)) {
                removeFavorite(id);
            } else {
                addFavorite(id);
            }
        },
        [isFavorite, addFavorite, removeFavorite]
    );

    const createPlaylist = React.useCallback((name: string) => {
        setLibraryData((prev) => ({
            ...prev,
            playlists: [
                ...prev.playlists,
                {
                    id: uuid(6),
                    name,
                    date: Date.now(),
                    songs: [],
                },
            ],
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
                playlists: prev.playlists.map((playlist) =>
                    playlist.id === id
                        ? {
                              ...playlist,
                              songs: [
                                  ...playlist.songs,
                                  ...songs.map((song) => ({
                                      id: song,
                                      date: Date.now(),
                                  })),
                              ],
                          }
                        : playlist
                ),
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

    return {
        log: libraryData,

        searches: libraryData.searches,
        addSearch,
        removeSearch,

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
    } as ContextType;
}

export default useOps;
