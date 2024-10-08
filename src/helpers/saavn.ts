import { ServerError, ServerResponse } from "@/modules/server";
import {
    MediaAlbum,
    MediaArtist,
    MediaArtistAlbums,
    MediaArtistSongs,
    MediaLyrics,
    MediaPlaylist,
    MediaSong,
} from "@/types/media";
import {
    SearchAlbum,
    SearchArtist,
    SearchArtistFilters,
    SearchPlaylist,
    SearchResult,
    SearchResultFor,
} from "@/types/search";
import { ServerMethods } from "@/types/server";
import axios, { AxiosRequestConfig } from "axios";

export const fetch = async <T>(
    method: ServerMethods,
    slug: string,
    options?: AxiosRequestConfig
) => {
    try {
        const response = await axios.request({
            method,
            url: slug,
            ...(options || {}),
        });

        if (!response.data.success) {
            return new ServerError(
                `Request failed with status ${response.status}: ${response.statusText}`,
                response.data,
                response.status
            );
        }

        return new ServerResponse<T>(response.data.data, response.data.message);
    } catch (error) {
        const err = error as Error;

        return new ServerError(err?.message || "An error occurred", err, 500);
    }
};

export class SaavnEndpoints {
    public static baseUrl =
        process.env.API_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        "https://saavn.dev";

    public static search = (
        query: string,
        type: string,
        page: number,
        limit: number
    ) => {
        const url = new URL(`/api/search${type}`, this.baseUrl);

        url.searchParams.append("query", query.trim().replace(/\s+/g, "+"));
        url.searchParams.append("page", page.toString());
        url.searchParams.append("limit", limit.toString());

        return url.toString();
    };

    public static songs = (ids: string[] | string) => {
        const url = new URL(this.baseUrl);

        ids = Array.isArray(ids) ? ids.join(",") : ids;

        url.pathname = `/api/songs/${ids}`;

        return url.toString();
    };

    public static songSuggestions = (id: string, limit: number = 10) => {
        const url = new URL(this.baseUrl);

        url.pathname = `/api/songs/${id}/suggestions`;

        url.searchParams.append("limit", limit.toString());

        return url.toString();
    };

    public static playlist = (
        id: string,
        page: number = 1,
        limit: number = 10
    ) => {
        const url = new URL("/api/playlists", this.baseUrl);

        url.searchParams.append("id", id);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("limit", limit.toString());

        return url.toString();
    };
    public static artist = (
        id: string,
        type: "" | "/songs" | "/albums",
        page: number = 1,
        limit: number = 10,
        sorts?: SearchArtistFilters
    ) => {
        const url = new URL(`/api/artists/${id}${type}`, this.baseUrl);

        url.searchParams.append("page", page.toString());
        url.searchParams.append("limit", limit.toString());
        url.searchParams.append("sortBy", sorts?.sortBy ?? "popularity");
        url.searchParams.append("sortOrder", sorts?.sortOrder ?? "desc");

        return url.toString();
    };

    public static album = (id: string) => {
        const url = new URL("/api/albums", this.baseUrl);

        url.searchParams.append("id", id);

        return url.toString();
    };
    public static lyrics = (id: string) => {
        const url = new URL(`/api/songs/${id}/lyrics`, this.baseUrl);

        return url.toString();
    };
}

export default class Saavn {
    public static get<T>(slug: string, options?: AxiosRequestConfig) {
        return fetch<T>("GET", slug, options);
    }

    public static lyrics(id: string) {
        return this.get<MediaLyrics>(SaavnEndpoints.lyrics(id));
    }

    public static getSongs(ids: string[] | string) {
        if (typeof ids === "string") {
            ids = [ids];
        }

        if (ids.length === 0) {
            return new ServerResponse<MediaSong[]>([], "No songs to fetch");
        }

        return this.get<MediaSong[]>(SaavnEndpoints.songs(ids));
    }

    public static getSongSuggestion(id: string, limit: number = 10) {
        return this.get<MediaSong[]>(SaavnEndpoints.songSuggestions(id, limit));
    }

    public static searchAll(
        query: string,
        page: number = 1,
        limit: number = 30
    ) {
        return this.get<SearchResult>(
            SaavnEndpoints.search(query, "", page, limit)
        );
    }

    public static searchSongs(
        query: string,
        page: number = 1,
        limit: number = 30
    ) {
        return this.get<SearchResultFor<MediaSong>>(
            SaavnEndpoints.search(query, "/songs", page, limit)
        );
    }

    public static searchAlbums(
        query: string,
        page: number = 1,
        limit: number = 30
    ) {
        return this.get<SearchResultFor<SearchAlbum>>(
            SaavnEndpoints.search(query, "/albums", page, limit)
        );
    }

    public static searchArtists(
        query: string,
        page: number = 1,
        limit: number = 30
    ) {
        return this.get<SearchResultFor<SearchArtist>>(
            SaavnEndpoints.search(query, "/artists", page, limit)
        );
    }

    public static searchPlaylists(
        query: string,
        page: number = 1,
        limit: number = 30
    ) {
        return this.get<SearchResultFor<SearchPlaylist>>(
            SaavnEndpoints.search(query, "/playlists", page, limit)
        );
    }

    public static playlist(id: string, page: number = 1, limit: number = 10) {
        return this.get<MediaPlaylist>(
            SaavnEndpoints.playlist(id, page, limit)
        );
    }

    public static artist(id: string) {
        return this.get<MediaArtist>(SaavnEndpoints.artist(id, ""));
    }
    public static async artistAlbums(
        id: string,
        page: number = 1,
        limit: number = 10
    ) {
        const results: MediaArtistAlbums = {
            total: limit,
            albums: [],
        };

        page = (page - 1) * Math.floor(limit / 10);

        for (let i = 0; i < Math.floor(limit / 10); i++) {
            const result = await this.get<MediaArtistAlbums>(
                SaavnEndpoints.artist(id, "/albums", page + i + 1)
            );

            if (!result.success) {
                return result;
            }

            results.total = result.data.total;
            results.albums.push(...result.data.albums);
        }
        results.albums = results.albums.slice(0, limit);

        return new ServerResponse<MediaArtistAlbums>(results);
    }
    public static async artistSongs(
        id: string,
        page: number = 1,
        limit: number = 10
    ) {
        const results: MediaArtistSongs = {
            total: limit,
            songs: [],
        };

        page = (page - 1) * Math.floor(limit / 10);

        for (let i = 0; i < Math.floor(limit / 10); i++) {
            const result = await this.get<MediaArtistSongs>(
                SaavnEndpoints.artist(id, "/songs", page + i + 1)
            );

            if (!result.success) {
                return result;
            }

            results.total = result.data.total;
            results.songs.push(...result.data.songs);
        }
        results.songs = results.songs.slice(0, limit);

        return new ServerResponse<MediaArtistSongs>(results);
    }

    public static async getTrending(ids: string[]) {
        const results: MediaSong[] = [];

        for (let id of ids) {
            const result = await this.getSongSuggestion(id);

            if (!result.success) {
                return result;
            }

            results.push(...result.data);
        }

        const albums: MediaAlbum[] = [];

        const albumIds = results
            .map((song) => song.album.id)
            .filter((id, index, self) => self.indexOf(id) === index)
            .sort(() => 0.5 - Math.random())
            .slice(0, 12);

        for (let id of albumIds) {
            const result = await this.album(id);

            if (!result.success) {
                return result;
            }

            albums.push(result.data);
        }

        const artists: MediaArtist[] = [];

        // get 10 random artists from both songs and albums
        const artistIds = [
            ...results.map((song) =>
                [
                    ...song.artists.all,
                    ...song.artists.featured,
                    ...song.artists.primary,
                ].map((artist) => artist.id)
            ),
            ...albums.map((album) =>
                [
                    ...album.artists.all,
                    ...album.artists.featured,
                    ...album.artists.primary,
                ].map((artist) => artist.id)
            ),
        ]
            .flat()
            .filter((id, index, self) => self.indexOf(id) === index)
            .sort(() => 0.5 - Math.random())
            .slice(0, 15);

        for (let id of artistIds) {
            const result = await this.artist(id);

            if (!result.success) {
                return result;
            }

            artists.push(result.data);
        }

        return new ServerResponse<{
            songs: MediaSong[];
            albums: MediaAlbum[];
            artists: MediaArtist[];
        }>({
            songs: results.sort(() => 0.5 - Math.random()).slice(0, 10),
            albums: albums.sort(() => 0.5 - Math.random()).slice(0, 10),
            artists: artists.sort(() => 0.5 - Math.random()).slice(0, 10),
        });
    }

    public static album(id: string) {
        return this.get<MediaAlbum>(SaavnEndpoints.album(id));
    }
}
