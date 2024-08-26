import React from "react";
import VolumeSeeker from "../volume";
import RoundButton from "@/components/tokens/button";
import usePlayer from "@/contexts/player";
import { usePlayerOptions, usePlayerVolume } from "@/contexts/player/hooks";
import LucideVolumeX from "@/components/lucide/volume-x";
import LucideVolume from "@/components/lucide/volume";
import LucideVolume1 from "@/components/lucide/volume-1";
import LucideVolume2 from "@/components/lucide/volume-2";
import LucideListMusic from "@/components/lucide/list-music";
import LucideInfo from "@/components/lucide/info";
import LucideMaximize2 from "@/components/lucide/maximize-2";
import { cn } from "@/lib/utils";
import LucideMicVocal from "@/components/lucide/mic-vocal";
import { usePathname, useRouter } from "next/navigation";
import LucideMinimize2 from "@/components/lucide/minimize-2";

function VolumeQueueFullscreen() {
    const player = usePlayer();
    const [options, updateOptions] = usePlayerOptions();
    const [volValue, , volMuted] = usePlayerVolume();

    const router = useRouter();
    const pathname = usePathname();

    const VolumeIcon = volMuted
        ? LucideVolumeX
        : volValue === 0
          ? LucideVolume
          : volValue < 0.5
            ? LucideVolume1
            : LucideVolume2;

    const FullScreenIcon = player.fullScreen
        ? LucideMinimize2
        : LucideMaximize2;

    React.useEffect(() => {
        router.prefetch("/lyrics");
    }, [router]);

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
                        <LucideInfo />
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
                        <LucideMicVocal />
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
                        <LucideListMusic />
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
