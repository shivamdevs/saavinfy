export type LibrarySearchHistory = {
    id: string;
    query: string;
    type: string;
    date: number;
};

export type LibrarySong = {
    id: string;
    song: string;
    createdAt: Date;
    playlistId: string;
};

export type LibraryPlaylistEditor = {
    edit?: Omit<LibraryPlaylist, "songs">;
    new?: string | string[] | true;
} | null;

export type LibraryPlaylist = {
    id: string;
    name: string;
    createdAt: Date;
    modifiedAt: Date;
    isFavorite: boolean;
    isPublic: boolean;

    songs: LibrarySong[];
};

export type LibraryHistory = {
    song: string;
    date: number;
};
