import { SearchArtistFilters } from "@/types/search";

const api =
    "https://www.jiosaavn.com/api.php?ctx=web6dot0&api_version=4&_format=json&_marker=0&__call=";

export const Endpoints = {
    search: (query: string, type: string, page: number, limit: number) =>
        `/search${type}?query=${query
            .trim()
            .replace(/\s+/g, "+")}&page=${page}&limit=${limit}`,
    songsByIds: (ids: string[] | string) =>
        `/songs/${Array.isArray(ids) ? ids.join(",") : ids}`,
    songsFromPlaylist: (id: string, page: number, limit: number) =>
        `/playlists?id=${id}&page=${page}&limit=${limit}`,
    songsFromArtist: (
        id: string,
        page: number,
        limit: number,
        sorts?: SearchArtistFilters
    ) =>
        `/artists/${id}/songs?page=${page}&limit=${limit}&sortBy=${sorts?.sortBy ?? "popularity"}&sortOrder=${sorts?.sortOrder ?? "desc"}`,
    album: (id: string) => `/albums?id=${id}`,
    lyrics: (id: string) => `/songs/${id}/lyrics`,

    vanilla: {
        topSearches: `${api}content.getTopSearches`,
    },
};
