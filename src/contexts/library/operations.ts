import React from "react";
import { ContextType } from "./context";
import crypt from "@/lib/crypt";
import { setCookie } from "cookies-next";
import { uuid } from "@/lib/utils";
import { Config } from "@/config";
import Limiter from "@/helpers/limiter";
import { SavedLibrary } from "@/types/saves";
import { LibraryPlaylistEditor } from "@/types/library";

function useOps(data: SavedLibrary) {
    const [libraryData, setLibraryData] = React.useState<SavedLibrary>(data);

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

    const clearSearches = React.useCallback(() => {
        setLibraryData((prev) => ({
            ...prev,
            searches: [],
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

        playlistEditor,
        setPlaylistEditor,
    } as ContextType;
}

export default useOps;
