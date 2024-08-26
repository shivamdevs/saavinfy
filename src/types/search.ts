import { MediaImage, MediaInlineArtists } from "./media";

export type SearchResult = {
    readonly topQuery: SearchResultWithPosition<
        (SearchSong | SearchAlbum | SearchArtist | SearchPlaylist)[]
    >;
    readonly songs: SearchResultWithPosition<SearchSong[]>;
    readonly albums: SearchResultWithPosition<SearchAlbum[]>;
    readonly artists: SearchResultWithPosition<SearchArtist[]>;
    readonly playlists: SearchResultWithPosition<SearchPlaylist[]>;
};

export type SearchResultType =
    | SearchSong
    | SearchAlbum
    | SearchArtist
    | SearchPlaylist;

export type SearchResultFor<T> = {
    readonly results: T[];
    start: number;
    total: number;
};

export type SearchResultWithPosition<T> = {
    readonly results: T;
    readonly position: number;
};

export type SearchMedia = {
    id: string;
    type: string;
    title: string;
    description: string;
    image: MediaImage[];

    // artists
    name?: string;
    role?: string;

    // playlists
    explicitContent?: boolean;
    songCount?: number;

    // albums
    playCount?: number | null;
};

export type SearchSong = SearchMedia & {
    type: "song";
    album: string;
    url: string;
    primaryArtists: string;
    singers: string;
    language: string;
};

export type SearchAlbum = SearchMedia & {
    type: "album";
    artist?: string;
    artists?: MediaInlineArtists;
    url: string;
    year: string;
    songIds: string;
    language: string;
};

export type SearchArtist = SearchMedia & {
    type: "artist";
    position?: number;
};

export type SearchPlaylist = SearchMedia & {
    type: "playlist";
    url: string;
    language: string;
};

export type SearchArtistFilters = {
    sortBy: "popularity" | "latest" | "alphabetical";
    sortOrder: "asc" | "desc";
};
