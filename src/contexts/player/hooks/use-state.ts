import usePlayer from "..";

export default function usePlayerState() {
    const player = usePlayer();

    return [player.playing, player.ended];
}
