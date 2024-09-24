import React from "react";
import usePlayer from "..";
import { useEventListener } from "react-unique-hooks";

export default function usePlayerBuffer() {
    const [buffer, setBuffer] = React.useState<number>(0);

    const player = usePlayer();

    const updateBuffer = React.useCallback(() => {
        const audioPlayer = player.element;

        let percent = 0;
        if (audioPlayer) {
            if (
                audioPlayer &&
                audioPlayer.buffered &&
                audioPlayer.buffered.length > 0
            ) {
                const { currentTime } = audioPlayer;
                const bufferedEnd = audioPlayer.buffered.end(
                    audioPlayer.buffered.length - 1
                );

                const timeDifference = bufferedEnd - currentTime;
                if (timeDifference < 1) {
                    percent =
                        (audioPlayer.currentTime / audioPlayer.duration) * 100;
                }

                percent = (bufferedEnd / audioPlayer.duration) * 100;
            } else {
                percent =
                    (audioPlayer.currentTime / audioPlayer.duration) * 100;
            }
        }
        setBuffer(percent);
    }, [player.element]);

    useEventListener("canplay", updateBuffer, player.element);
    useEventListener("progress", updateBuffer, player.element);
    useEventListener("timeupdate", updateBuffer, player.element);
    useEventListener("loadeddata", updateBuffer, player.element);
    useEventListener("loadedmetadata", updateBuffer, player.element);

    return buffer;
}
