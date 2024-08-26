import usePlayer from "..";

export default function usePlayerTiming() {
    const player = usePlayer();

    return [player.currentTime, player.duration] as const;
}
