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

// function makeServerUrl(slug: string, params?: Record<string, string | number>) {
// 	const url = new URL("https://www.jiosaavn.com/api.php");

// 	url.searchParams.append("__call", slug);
// 	url.searchParams.append("_format", "json");
// 	url.searchParams.append("_marker", "0");
// 	url.searchParams.append("api_version", "4");
// 	url.searchParams.append("ctx", "web6dot0");

// 	if (params) {
// 		Object.entries(params).forEach(([key, value]) => {
// 			url.searchParams.append(key, value.toString());
// 		});
// 	}

// 	return url.toString();
// }

// export async function serverCall<T>(
// 	slug: string,
// 	params?: Record<string, string | number>
// ) {
// 	try {
// 		const response = await fetcher.request({
// 			url: makeServerUrl(slug, params),
// 		});

// 		if (!response.data.success) {
// 			return {
// 				success: false,
// 				message: `Request failed with status ${response.status}: ${response.statusText}`,
// 				data: response.data,
// 			} as CallError;
// 		}

// 		return response.data as CallResponse<T>;
// 	} catch (error) {
// 		const err = error as Error;
// 		return {
// 			success: false,
// 			message: err?.message || "An error occurred",
// 			data: err,
// 		} as CallError;
// 	}
// }

// export default async function call<T>(
// 	method: CallMethods,
// 	slug: string,
// 	data?: any
// ) {
// 	try {
// 		const url = new URL(`/api${slug}`, "http://localhost:5005");
// 		const response = await fetch(url.toString(), {
// 			method,
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			credentials: "same-origin",
// 			body: JSON.stringify(data),
// 		});

// 		const json = await response.json();

// 		if (!response.ok) {
// 			return {
// 				success: false,
// 				message: `Request failed with status ${response.status}: ${response.statusText}`,
// 				data: json,
// 			} as CallError;
// 		}

// 		console.log(json, url.toString());

// 		return json as CallResponse<T>;
// 	} catch (error) {
// 		const err = error as Error;
// 		return {
// 			success: false,
// 			message: err?.message || "An error occurred",
// 			data: err,
// 		} as CallError;
// 	}
// }
