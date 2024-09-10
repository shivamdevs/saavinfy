import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { v4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const uuid = (length?: number, replaceHyphens?: boolean) => {
    let res = v4();
    if (!length) return res;

    if (replaceHyphens) {
        res = res.replace(/-/g, "");
    }

    while (res.length < length) {
        res += uuidV4();

        if (replaceHyphens) {
            res = res.replace(/-/g, "");
        }
    }

    return res.slice(0, length);
};

export const uuidV4 = uuid;

export function getServerPathname(head: ReadonlyHeaders) {
    const url = new URL(
        head.get("referer") ?? "",
        head.get("host") ?? "http://localhost"
    );

    return url.pathname;
}

export function convertHTMLEntities(html: string = ""): string {
    if (typeof DOMParser === "undefined") {
        return html;
    }

    const doc = new DOMParser().parseFromString(html, "text/html");

    return doc.documentElement.textContent || "";
}

export function formatSeconds(seconds: number = 0) {
    if (isNaN(seconds)) {
        return "0:00";
    }

    seconds = Math.floor(seconds);

    // return in format m:ss
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function getSearchFilter(type: string, prefix: boolean = true) {
    const allowedTypes = ["", "songs", "albums", "artists", "playlists"];

    if (type && allowedTypes.includes(type)) {
        return `${prefix ? "/" : ""}${type}`;
    }

    return "";
}

export function shuffleArray<T>(array: T[]) {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
}

export function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function calculateFileSize(duration: number, kbps: number | string) {
    if (typeof kbps === "string") {
        kbps = parseInt(kbps);
        if (isNaN(kbps)) {
            kbps = 12;
        }
    }

    const size = (duration / 8) * kbps * 1000;

    return formatBytes(size);
}

export function formatPlural(
    count: number,
    singular: string,
    plural: string = `${singular}s`
) {
    return count === 1 ? singular : plural;
}

export function formatDateAndTime(date: number, noNumber: boolean = true) {
    // if within 10 seconds => "Just now"
    // if within 1 minute => "x seconds ago"
    // if within 1 hour => "x minutes ago"
    // if within 1 day => "x hours ago"
    // if within 1 week => "x days ago"
    // else => "MMM DD, YYYY HH:MM AM/PM"
    // format plurals also

    const now = Date.now();
    const diff = now - date;

    if (diff < 10 * 1000) {
        return "just now";
    }

    if (noNumber) {
        if (diff < 30 * 1000) {
            return "few seconds ago";
        }

        if (diff < 60 * 1000) {
            return "minute ago";
        }

        if (diff < 60 * 10 * 1000) {
            return "few minutes ago";
        }

        if (diff < 60 * 45 * 1000) {
            return "half hour ago";
        }

        if (diff < 60 * 90 * 1000) {
            return "hour ago";
        }
    }

    if (diff < 60 * 1000) {
        const seconds = Math.floor(diff / 1000);

        return `${seconds} ${formatPlural(seconds, "second")} ago`;
    }

    if (diff < 60 * 60 * 1000) {
        const minutes = Math.floor(diff / (60 * 1000));

        return `${minutes} ${formatPlural(minutes, "minute")} ago`;
    }

    if (diff < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(diff / (60 * 60 * 1000));

        return `${hours} ${formatPlural(hours, "hour")} ago`;
    }

    if (diff < 7 * 24 * 60 * 60 * 1000) {
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));

        return `${days} ${formatPlural(days, "day")} ago`;
    }

    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    return `${d.toLocaleString("default", {
        month: "short",
    })} ${d.getDate()}, ${d.getFullYear()} ${formattedHours}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;
}
