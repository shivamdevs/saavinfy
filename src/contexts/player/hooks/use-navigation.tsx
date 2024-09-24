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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player.queue, player.current]);

    const getPrevious = React.useCallback(() => {
        if (!player.queue.length) return false;

        const currentIndex = player.queue.findIndex(
            (track) => track.id === player.current
        );

        return currentIndex > 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player.queue, player.current]);

    const next = React.useCallback(() => {
        if (!hasNext) return;

        const currentIndex = player.queue.findIndex(
            (track) => track.id === player.current
        );

        player.play(player.queue[currentIndex + 1]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasNext, player.queue, player.play, player.current]);

    const previous = React.useCallback(() => {
        if (!hasPrevious) return;

        const currentIndex = player.queue.findIndex(
            (track) => track.id === player.current
        );

        player.play(player.queue[currentIndex - 1]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasPrevious, player.queue, player.play, player.current]);

    React.useLayoutEffect(() => {
        const hasPrevious = getPrevious();
        const hasNext = getNext();

        setHasPrevious(hasPrevious);
        setHasNext(hasNext);
    }, [getNext, getPrevious, player.queue]);

    const toggleLoop = React.useCallback(() => {
        player.updateOptions({
            loop:
                player.options.loop === 0
                    ? 2
                    : player.options.loop === 2
                      ? 1
                      : 0,
        });
    }, [player]);

    return {
        play: player.play,
        pause: player.pause,
        toggle: player.toggle,

        hasNext,
        hasPrevious,

        next,
        previous,

        toggleLoop,
    } as const;
}
