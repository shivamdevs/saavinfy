import React from "react";
import usePlayer from "..";

export default function usePlayerOptions() {
    const player = usePlayer();

    return [player.options, player.updateOptions] as const;
}
