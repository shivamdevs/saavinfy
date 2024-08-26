import {
    LibraryCache,
    LibraryFavorite,
    LibraryPlaylist,
    LibrarySearchHistory,
} from "@/types/library";
import React from "react";

export type ContextType = {
    log: LibraryCache;

    searches: LibrarySearchHistory[];
    addSearch: (query: string, type: string) => void;
    removeSearch: (id: string) => void;

    favorites: LibraryFavorite[];
    addFavorite: (id: string) => void;
    removeFavorite: (id: string) => void;

    playlists: LibraryPlaylist[];
    createPlaylist: (name: string) => void;
    removePlaylist: (id: string) => void;
    renamePlaylist: (id: string, name: string) => void;
    addSongsToPlaylist: (id: string, songs: string[] | string) => void;
};

export const contextDefaultValue: ContextType = {
    log: {
        searches: [],
        favorites: [],
        playlists: [],
    },

    searches: [],
    addSearch: () => {},
    removeSearch: () => {},

    favorites: [],
    addFavorite: () => {},
    removeFavorite: () => {},

    playlists: [],
    createPlaylist: () => {},
    removePlaylist: () => {},
    renamePlaylist: () => {},
    addSongsToPlaylist: () => {},
};

export const ContextElement =
    React.createContext<ContextType>(contextDefaultValue);

ContextElement.displayName = "Library Manager";

export function useHook(): ContextType {
    const context = React.useContext(ContextElement);

    if (!context)
        throw new Error(
            `Unable to access ${ContextElement.displayName} Context API.`
        );

    return context;
}

export default ContextElement;
