import usePlayer from "..";

export default function usePlayerVolume() {
    const player = usePlayer();

    return [player.volume, player.setVolume, player.options.muted] as const;
}
