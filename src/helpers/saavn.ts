import { ServerError, ServerResponse } from "@/modules/server";
import {
    MediaAlbum,
    MediaArtistSongs,
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

const fetch = async <T>(
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
    public static baseUrl = "https://saavn.dev";

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
    public static artistSongs = (
        id: string,
        page: number = 1,
        limit: number = 10,
        sorts?: SearchArtistFilters
    ) => {
        const url = new URL(`/api/artists/${id}/songs`, this.baseUrl);

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

    public static getSongs(ids: string[] | string) {
        if (typeof ids === "string") {
            ids = [ids];
        }

        if (ids.length === 0) {
            return new ServerResponse<MediaSong[]>([], "No songs to fetch");
        }

        return this.get<MediaSong[]>(SaavnEndpoints.songs(ids));
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

    public static artistSongs(
        id: string,
        page: number = 1,
        limit: number = 10
    ) {
        return this.get<MediaArtistSongs>(
            SaavnEndpoints.artistSongs(id, page, limit)
        );
    }

    public static album(id: string) {
        return this.get<MediaAlbum>(SaavnEndpoints.album(id));
    }
}
