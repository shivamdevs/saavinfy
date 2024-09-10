import { PlayerPanel } from "@/types/opts";
import usePlayer from "..";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

export default function usePlayerOptions() {
    const player = usePlayer();
    const pathname = usePathname();
    const router = useRouter();

    const togglePanel = React.useCallback(
        (key: PlayerPanel) => {
            player.updateOptions({
                panel: player.options.panel === key ? undefined : key,
            });
        },
        [player]
    );

    const isPanel = React.useCallback(
        <T>(key: PlayerPanel, ifTrue?: T, ifFalse?: T) => {
            return player.options.panel === key
                ? (ifTrue ?? true)
                : (ifFalse ?? false);
        },
        [player]
    );

    const panels = React.useMemo(() => {
        return {
            is: isPanel,
            toggle: togglePanel,
        };
    }, [isPanel, togglePanel]);

    const lyrics = React.useMemo(() => {
        return {
            is: pathname.startsWith("/lyrics/"),
            toggle: () => {
                if (pathname.startsWith("/lyrics/")) {
                    if (window.history && window.history.length > 1) {
                        router.back();
                    } else {
                        router.push("/");
                    }
                } else {
                    router.push(`/lyrics/${player.currentSong?.id}`);
                }
            },
        };
    }, [pathname, player.currentSong?.id, router]);

    return {
        ...player.options,
        panels,
        update: player.updateOptions,
        lyrics,
    } as const;
}
