import axios, { AxiosRequestConfig } from "axios";

export type CallMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type CallResponse<T = unknown> = {
    success: true;
    data: T;
    message?: string;
};

export type CallError = {
    success: false;
    message: string;
    data: unknown;
};

const fetcher = axios.create({
    baseURL: "http://localhost:5005/api",
});

export default async function call<T>(
    method: CallMethods,
    slug: string,
    data?: any,
    options?: AxiosRequestConfig
) {
    try {
        const response = await fetcher.request({
            method,
            url: slug,
            data,
            ...(options || {}),
        });

        if (!response.data.success) {
            return {
                success: false,
                message: `Request failed with status ${response.status}: ${response.statusText}`,
                data: response.data,
            } as CallError;
        }

        return response.data as CallResponse<T>;
    } catch (error) {
        const err = error as Error;

        return {
            success: false,
            message: err?.message || "An error occurred",
            data: err,
        } as CallError;
    }
}

export function serverCall<T>(slug: string) {
    return call<T>("GET", slug, null, {
        baseURL: "https://saavn.dev/api",
    });
}

export function serverVanilla<T>(url: string) {
    return call<T>("GET", url);
}
