import {
    LibraryHistory,
    LibraryPlaylist,
    LibraryPlaylistEditor,
    LibrarySearchHistory,
} from "@/types/library";
import { SavedLibrary } from "@/types/saves";
import React from "react";

export type ContextType = {
    log: SavedLibrary | null;

    searches: LibrarySearchHistory[];
    // eslint-disable-next-line no-unused-vars
    addSearch: (query: string, type: string) => void;
    // eslint-disable-next-line no-unused-vars
    removeSearch: (id: string) => void;
    clearSearches: () => void;

    favorites: LibraryPlaylist | null;
    // eslint-disable-next-line no-unused-vars
    addFavorite: (ids: string | string[]) => void;
    // eslint-disable-next-line no-unused-vars
    removeFavorite: (ids: string | string[]) => void;
    // eslint-disable-next-line no-unused-vars
    toggleFavorite: (id: string) => void;
    // eslint-disable-next-line no-unused-vars
    isFavorite: (id: string) => boolean;

    playlists: LibraryPlaylist[];
    // eslint-disable-next-line no-unused-vars
    createPlaylist: (name: string) => void;
    // eslint-disable-next-line no-unused-vars
    removePlaylist: (id: string) => void;
    // eslint-disable-next-line no-unused-vars
    renamePlaylist: (id: string, name: string) => void;
    // eslint-disable-next-line no-unused-vars
    addSongsToPlaylist: (id: string, songs: string[] | string) => void;
    // eslint-disable-next-line no-unused-vars
    removeSongsFromPlaylist: (id: string, songs: string | string) => void;

    history: LibraryHistory[];
    // eslint-disable-next-line no-unused-vars
    addHistory: (ids: string | string[]) => void;
    // eslint-disable-next-line no-unused-vars
    removeHistory: (ids: string | string[]) => void;
    clearHistory: () => void;

    // eslint-disable-next-line no-unused-vars
    playlistEditor: LibraryPlaylistEditor;
    // eslint-disable-next-line no-unused-vars
    setPlaylistEditor: React.Dispatch<
        React.SetStateAction<LibraryPlaylistEditor>
    >;
};

export const contextDefaultValue: ContextType = {
    log: null,

    searches: [],
    addSearch: () => {},
    removeSearch: () => {},
    clearSearches: () => {},

    favorites: null,
    addFavorite: () => {},
    removeFavorite: () => {},
    toggleFavorite: () => {},
    isFavorite: () => false,

    playlists: [],
    createPlaylist: () => {},
    removePlaylist: () => {},
    renamePlaylist: () => {},
    addSongsToPlaylist: () => {},
    removeSongsFromPlaylist: () => {},

    history: [],
    addHistory: () => {},
    removeHistory: () => {},
    clearHistory: () => {},

    playlistEditor: null,
    setPlaylistEditor: () => {},
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
