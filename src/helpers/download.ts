// import { Meta } from "@/config/meta";

export default class Download {
    // public static async fromURL(url: string, name: string, quality: string) {
    //     name = name
    //         .toLowerCase()
    //         .replace(/[^a-z0-9-]/g, "-")
    //         .replace(/-+/g, "-")
    //         .slice(0, 256 - 4 - quality.length - Meta.applicationName!.length);
    //     const fileName = `${Meta.applicationName}-${name}-${quality}.mp3`;
    //     const response = await fetch(url);
    //     if (!response.ok || !response.body) {
    //         throw new Error("Failed to download this song. Please try again.");
    //     }
    //     const blob = await response.blob();
    //     const url_1 = URL.createObjectURL(blob);
    //     const a = document.createElement("a");
    //     a.href = url_1;
    //     a.download = fileName;
    //     a.click();
    //     URL.revokeObjectURL(url_1);
    // }
}
