export type MediaImage = {
    quality: MediaImageQuality;
    url: string;
};

export type MediaItem = {
    id: string;
    name?: string;
    title?: string;
    type?: string;
    image: MediaImage[];
    description?: string;
};

export type MediaImageQuality = "50x50" | "150x150" | "500x500";

export type MediaType = "song" | "album" | "artist" | "playlist";

export type MediaDownloadURL = {
    quality: MediaDownloadURLQuality;
    url: string;
};

export type MediaDownloadURLQuality =
    | "12kbps"
    | "48kbps"
    | "96kbps"
    | "160kbps"
    | "320kbps";

export type MediaSong = {
    id: string;
    name: string;
    type: string;
    year: string;
    releaseDate: Date;
    duration: number;
    label: string;
    explicitContent: boolean;
    playCount: number;
    language: string;
    hasLyrics: boolean;
    lyricsId: null;
    url: string;
    copyright: string;
    album: MediaSongAlbum;
    artists: MediaInlineArtists;
    image: MediaImage[];
    downloadUrl: MediaDownloadURL[];

    // Additional fields
    title?: string;
    description?: string;
};

export type MediaSongAlbum = {
    id: string;
    name: string;
    url: string;
};

export type MediaInlineArtists = {
    primary: MediaInlineArtist[];
    featured: MediaInlineArtist[];
    all: MediaInlineArtist[];
};

export type MediaInlineArtist = {
    id: string;
    name: string;
    role: string;
    image: MediaImage[];
    type: string;
    url: string;
};

export type MediaPlaylist = {
    id: string;
    name: string;
    title?: string;
    description: string;
    type: string;
    year: number | null;
    playCount: number | null;
    language: string;
    explicitContent: boolean;
    url: string;
    songCount: number;
    artists: MediaInlineArtist[];
    image: MediaImage[];
    songs: MediaSong[];
};

export type MediaArtistSongs = {
    songs: MediaSong[];
    total: number;
};

export type MediaArtistAlbums = {
    albums: MediaAlbum[];
    total: number;
};

export type MediaAlbum = {
    id: string;
    name: string;
    title?: string;
    description: string;
    type: string;
    year: number;
    playCount: number | null;
    language: string;
    explicitContent: boolean;
    url: string;
    songCount: number;
    artists: MediaInlineArtists;
    image: MediaImage[];
    songs: MediaSong[];
};

export type MediaLyrics = {
    lyrics: string;
    copyright: string;
    snippet: string;
};

export type MediaArtist = {
    id: string;
    name: string;
    title?: string;
    url: string;
    type: "artist";
    followerCount: number;
    fanCount: string;
    isVerified: boolean;
    dominantLanguage: string;
    dominantType: string;
    bio: MediaArtistBio[];
    dob: string | null;
    fb: string | null;
    twitter: string | null;
    wiki: string | null;
    availableLanguages: string[];
    isRadioPresent: boolean;
    image: MediaImage[];
    topSongs: MediaSong[];
    topAlbums: MediaAlbum[];
    singles: MediaAlbum[];
    similarArtists: MediaInlineArtist[];
};

export type MediaArtistBio = {
    text: string;
    title: string;
    sequence: number;
};

export type Media = MediaSong | MediaAlbum | MediaPlaylist | MediaArtist;
