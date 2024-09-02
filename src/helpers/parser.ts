export default class Parser {
    public static plural(
        count: number,
        singular: string,
        plural: string = `${singular}s`
    ) {
        return count === 1 ? singular : plural;
    }

    public static moment(date: number, noNumber: boolean = true) {
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

            return `${seconds} ${Parser.plural(seconds, "second")} ago`;
        }

        if (diff < 60 * 60 * 1000) {
            const minutes = Math.floor(diff / (60 * 1000));

            return `${minutes} ${Parser.plural(minutes, "minute")} ago`;
        }

        if (diff < 24 * 60 * 60 * 1000) {
            const hours = Math.floor(diff / (60 * 60 * 1000));

            return `${hours} ${Parser.plural(hours, "hour")} ago`;
        }

        if (diff < 7 * 24 * 60 * 60 * 1000) {
            const days = Math.floor(diff / (24 * 60 * 60 * 1000));

            return `${days} ${Parser.plural(days, "day")} ago`;
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

    public static mediaSize(duration: number, kbps: number | string) {
        if (typeof kbps === "string") {
            kbps = parseInt(kbps);
            if (isNaN(kbps)) {
                kbps = 12;
            }
        }

        const size = (duration / 8) * kbps * 1000;

        return Parser.bytes(size);
    }

    public static bytes(bytes: number, decimals = 2) {
        if (bytes === 0) return "0 Bytes";

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    public static seconds(seconds: number = 0) {
        if (isNaN(seconds)) {
            return "0:00";
        }

        seconds = Math.floor(seconds);

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    }

    public static entity(html: string = ""): string {
        if (html === "") {
            return "";
        }

        if (typeof DOMParser === "undefined") {
            return html;
        }

        const doc = new DOMParser().parseFromString(html, "text/html");

        return doc.documentElement.textContent || html;
    }
}
