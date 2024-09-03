import React from "react";
import usePlayer from "..";

export default function usePlayerNavigation() {
    const player = usePlayer();
    const [hasPrevious, setHasPrevious] = React.useState(false);
    const [hasNext, setHasNext] = React.useState(false);

    const getNext = React.useCallback(() => {
        if (!player.queue.length) return false;

        const currentIndex = player.queue.findIndex(
            (track) => track.id === player.current
        );

        return currentIndex < player.queue.length - 1;
    }, [player]);

    const getPrevious = React.useCallback(() => {
        if (!player.queue.length) return false;

        const currentIndex = player.queue.findIndex(
            (track) => track.id === player.current
        );

        return currentIndex > 0;
    }, [player]);

    const next = React.useCallback(() => {
        if (!hasNext) return;

        const currentIndex = player.queue.findIndex(
            (track) => track.id === player.current
        );

        player.play(player.queue[currentIndex + 1]);
    }, [hasNext, player]);

    const previous = React.useCallback(() => {
        if (!hasPrevious) return;

        const currentIndex = player.queue.findIndex(
            (track) => track.id === player.current
        );

        player.play(player.queue[currentIndex - 1]);
    }, [hasPrevious, player]);

    React.useEffect(() => {
        const hasPrevious = getPrevious();
        const hasNext = getNext();

        setHasPrevious(hasPrevious);
        setHasNext(hasNext);
    }, [getNext, getPrevious, player.queue]);

    return {
        play: player.play,
        pause: player.pause,
        toggle: player.toggle,

        hasNext,
        hasPrevious,

        next,
        previous,
    } as const;
}
