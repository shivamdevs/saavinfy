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
    // eslint-disable-next-line no-unused-vars
    addSearch: (query: string, type: string) => void;
    // eslint-disable-next-line no-unused-vars
    removeSearch: (id: string) => void;

    favorites: LibraryFavorite[];
    // eslint-disable-next-line no-unused-vars
    addFavorite: (id: string) => void;
    // eslint-disable-next-line no-unused-vars
    removeFavorite: (id: string) => void;

    playlists: LibraryPlaylist[];
    // eslint-disable-next-line no-unused-vars
    createPlaylist: (name: string) => void;
    // eslint-disable-next-line no-unused-vars
    removePlaylist: (id: string) => void;
    // eslint-disable-next-line no-unused-vars
    renamePlaylist: (id: string, name: string) => void;
    // eslint-disable-next-line no-unused-vars
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
