import { Meta } from "@/config/meta";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";

export default function downloadFromLink(
    link: string,
    name: string,
    quality: string
) {
    let cached = toast.loading("Downloading your song...", {
        position: "top-right",
    });

    name = name
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 256 - 4 - Meta.applicationName!.length);

    const fileName = `${Meta.applicationName}-${name}-${quality}.mp3`;

    fetch(link)
        .then((response) => {
            if (!response.ok || !response.body) {
                return toast.error(
                    "Failed to download this song. Please try again.",
                    { id: cached }
                );
            }

            const totalBytes = Number(response.headers.get("Content-Length"));
            let downloadedBytes = 0;

            const progressCallback = (chunk: Uint8Array) => {
                downloadedBytes += chunk.length;
                const progress = (downloadedBytes / totalBytes) * 100;
                cached = toast.loading(
                    `Download progress: ${progress.toFixed(0)}%`,
                    { id: cached }
                );
            };

            const reader = response.body.getReader();

            return new ReadableStream({
                start(controller) {
                    async function pump(): Promise<void> {
                        const { done, value } = await reader.read();
                        if (done) {
                            controller.close();
                            return;
                        }
                        controller.enqueue(value);
                        progressCallback(value);
                        return pump();
                    }
                    return pump();
                },
            });
        })
        .then((stream) => new Response(stream))
        .then((response) => response.blob())
        .then((blob) => saveAs(blob, fileName))
        .then(() => {
            toast.success("Song downloaded successfully.", { id: cached });
        })
        .catch((error) => {
            toast.error("Failed to download this song. Please try again.", {
                id: cached,
            });
            console.error(error);
        });
}
