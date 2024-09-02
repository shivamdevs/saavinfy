import React from "react";
import VolumeSeeker from "../volume";
import RoundButton from "@/components/tokens/button";
import usePlayer from "@/contexts/player";
import { usePlayerOptions, usePlayerVolume } from "@/contexts/player/hooks";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Lucide from "@/components/lucide";

function VolumeQueueFullscreen() {
    const player = usePlayer();
    const { update: updateOptions, ...options } = usePlayerOptions();
    const [volValue, , volMuted] = usePlayerVolume();

    const router = useRouter();
    const pathname = usePathname();

    const VolumeIcon = volMuted
        ? Lucide.VolumeX
        : volValue === 0
          ? Lucide.Volume
          : volValue < 0.5
            ? Lucide.Volume1
            : Lucide.Volume2;

    const FullScreenIcon = player.fullScreen
        ? Lucide.Minimize2
        : Lucide.Maximize2;

    React.useLayoutEffect(() => {
        router.prefetch("/lyrics");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {!player.fullScreen && (
                <>
                    <RoundButton
                        size={35}
                        className={cn("rounded-full p-2 transition-all", {
                            "text-primary": options.panel === "info",
                        })}
                        onClick={() => {
                            updateOptions({
                                panel:
                                    options.panel === "info"
                                        ? undefined
                                        : "info",
                            });
                        }}
                    >
                        <Lucide.Info />
                    </RoundButton>
                    <RoundButton
                        size={35}
                        className={cn("rounded-full p-2 transition-all", {
                            "text-primary": pathname === "/lyrics",
                        })}
                        onClick={() => {
                            if (pathname === "/lyrics") {
                                if (
                                    window.history &&
                                    window.history.length > 1
                                ) {
                                    router.back();
                                } else {
                                    router.push("/");
                                }
                            } else {
                                router.push("/lyrics");
                            }
                        }}
                    >
                        <Lucide.MicVocal />
                    </RoundButton>
                    <RoundButton
                        size={35}
                        className={cn("rounded-full p-2 transition-all", {
                            "text-primary": options.panel === "queue",
                        })}
                        onClick={() => {
                            updateOptions({
                                panel:
                                    options.panel === "queue"
                                        ? undefined
                                        : "queue",
                            });
                        }}
                    >
                        <Lucide.ListMusic />
                    </RoundButton>
                </>
            )}
            <RoundButton
                size={35}
                className="rounded-full p-2 transition-all"
                onClick={() => {
                    player.element!.muted = !volMuted;
                    updateOptions({ muted: !volMuted });
                }}
            >
                <VolumeIcon />
            </RoundButton>
            <VolumeSeeker />
            <RoundButton
                size={35}
                className={cn("rounded-full p-2.5 transition-all", {
                    "text-primary": player.fullScreen,
                })}
                onClick={() => {
                    player.setFullScreen(!player.fullScreen);
                }}
            >
                <FullScreenIcon />
            </RoundButton>
        </>
    );
}

export default VolumeQueueFullscreen;
