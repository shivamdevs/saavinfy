export type LibraryCache = {
    searches: LibrarySearchHistory[];
    favorites: LibraryFavorite[];
    playlists: LibraryPlaylist[];
};

export type LibrarySearchHistory = {
    id: string;
    query: string;
    type: string;
    date: number;
};

export type LibraryFavorite = {
    id: string;
    date: number;
};

export type LibraryPlaylist = {
    id: string;
    name: string;
    date: number;
    songs: string[];
};
