export type LibrarySearchHistory = {
    id: string;
    query: string;
    type: string;
    date: number;
};

export type LibraryFavorite = {
    date: number;
    songs: LibrarySong[];
};

export type LibraryPlaylist = {
    id: string;
    name: string;
    date: number;
    songs: LibrarySong[];
};

export type LibrarySong = {
    id: string;
    date: number;
};

export type LibraryPlaylistEditor = {
    edit?: Omit<LibraryPlaylist, "songs">;
    new?: string | string[] | true;
} | null;
