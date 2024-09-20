import { Meta } from "@/config/meta";
import Stack from "@/contexts/stack/stack";
import { saveAs } from "file-saver";
import { toast } from "react-hot-toast";

export default function downloadFromLink(
    link: string,
    name: string,
    quality: string,
    stack: Stack
) {
    const originalName = name;

    name = name
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 256 - 4 - Meta.applicationName!.length);

    const fileName = `${Meta.applicationName}-${name}-${quality}.mp3`;

    fetch(link)
        .then((response) => {
            if (!response.ok || !response.body) {
                stack.error(
                    `Failed to download ${originalName}.`,
                    "Unable to download the song. Please try again."
                );

                return toast.error(
                    "Failed to download this song. Please try again."
                );
            }

            const totalBytes = Number(response.headers.get("Content-Length"));

            stack.update({ progress: 10, count: totalBytes + 10 });

            let downloadedBytes = 0;

            const progressCallback = (chunk: Uint8Array) => {
                downloadedBytes += chunk.length;
                const progress = (downloadedBytes / totalBytes) * 100;
                stack.update({ progress });
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
            stack.success(`Downloaded ${originalName} in ${quality}.`);
        })
        .catch((error) => {
            stack.error(
                `Failed to download ${originalName}.`,
                "Unable to download the song. Please try again."
            );

            toast.error("Failed to download this song. Please try again.");
            console.error(error);
        });
}
