import usePlayer from "@/contexts/player";
import { useDebounce } from "react-unique-hooks";
import useLibrary from "..";
import React from "react";

export default function useLibraryHistory() {
    const player = usePlayer();
    const library = useLibrary();

    const addToHistory = React.useCallback(() => {
        if (!player.currentSong) {
            return;
        }

        library.addHistory(player.currentSong.id);
    }, [player.currentSong, library]);

    // after 100ms of no changes to the current song
    useDebounce(addToHistory, 100, [player.currentSong]);

    // // every 30 seconds
    // const { start, stop } = useInterval(addToHistory, 30000);

    // React.useEffect(() => {
    //     if (player.playing) {
    //         start();
    //     } else {
    //         stop();
    //     }
    // }, [player.playing, start, stop]);

    return null;
}
