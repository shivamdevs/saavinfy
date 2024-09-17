import { ServerError, ServerResponse } from "@/modules/server";
import { LibrarySong } from "@/types/library";
import { ServerMethods } from "@/types/server";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const fetch = async <T>(
    method: ServerMethods,
    slug: string,
    options?: AxiosRequestConfig
) => {
    try {
        const response = await axios.request({
            method,
            url: `/api/lib${slug}`,
            ...(options || {}),
        });

        const data = response.data as ServerResponse | ServerError;

        if (!data.success) {
            return new ServerError(
                data.message ||
                    `Request failed with status ${response.status}: ${response.statusText}`,
                data.data,
                data.status
            );
        }

        return new ServerResponse<T>(response.data.data, response.data.message);
    } catch (error) {
        const err = error as AxiosError<ServerError>;

        return new ServerError(
            err?.response?.data?.message || err?.message || "An error occurred",
            err?.response?.data || err?.response || err,
            err?.response?.status || 500
        );
    }
};

export class LibRar {
    public static playlistSongs(
        playlist: string,
        songs: string[],
        type: "PUT" | "DELETE"
    ) {
        return fetch<{
            modifiedAt: Date;
            songs: LibrarySong[];
        }>(type, `/playlists/${playlist}/songs`, {
            data: { songs },
        });
    }
}
