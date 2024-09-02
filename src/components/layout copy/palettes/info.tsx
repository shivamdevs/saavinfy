import React, { useEffect } from "react";
import PalettesHeader from "./header";
import usePlayer from "@/contexts/player";
import PalettesBox from "./box";
import Entity from "@/components/tokens/entity";
import useColors from "@/contexts/hooks/use-colors";
import { calculateFileSize, cn } from "@/lib/utils";
import Image from "next/image";
import ScreenOffset from "../screen";
import { Heading, Text } from "@/components/tokens/typography";
import { getSongArtists } from "@/components/tokens/list";
import Link from "next/link";
import { MediaDownloadURL } from "@/types/media";
import downloadFromLink from "@/lib/download";
import RoundButton from "@/components/tokens/button";
import useLibrary from "@/contexts/library";
import Lucide from "@/components/lucide";

function InfoPalette() {
    const player = usePlayer();
    const library = useLibrary();

    const { currentSong } = player;

    const colors = useColors(currentSong?.image);

    useEffect(() => {
        if (!currentSong) {
            player.updateOptions({ panel: undefined });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSong]);

    if (!currentSong) return null;

    return (
        <>
            <PalettesHeader
                style={{
                    backgroundColor: colors?.background,
                }}
                className={cn({
                    "text-black": !colors?.isDark,
                    "text-white": colors?.isDark,
                })}
            >
                Playing now
            </PalettesHeader>
            <PalettesBox className="">
                <div
                    style={{
                        backgroundColor: colors?.background,
                    }}
                    className={cn("w-full aspect-[9/16] py-4 px-10")}
                >
                    <Link
                        href={`/song/${currentSong.id}`}
                        className="aspect-square w-full rounded-lg overflow-hidden relative shadow-2xl block"
                    >
                        <Image
                            src={currentSong.image.at(-1)?.url!}
                            alt={currentSong.title ?? currentSong.name ?? ""}
                            width={500}
                            height={500}
                            className="absolute inset-0 object-cover"
                        />
                    </Link>
                </div>
                <ScreenOffset className="p-5 flex flex-col gap-3">
                    <div className="absolute right-2 -top-6 gap-2 flex">
                        <RoundButton
                            size={48}
                            onClick={() => {
                                library.toggleFavorite(currentSong.id);
                            }}
                        >
                            <Lucide.Heart
                                size={24}
                                className={cn({
                                    "text-primary": library.isFavorite(
                                        currentSong.id
                                    ),
                                })}
                                fill={
                                    library.isFavorite(currentSong.id)
                                        ? "currentColor"
                                        : "none"
                                }
                            />
                        </RoundButton>
                        <RoundButton size={48}>
                            <Lucide.CirclePlus size={24} />
                        </RoundButton>
                    </div>
                    <Link href={`/song/${currentSong.id}`}>
                        <Heading level={2} className="text-2xl font-semibold">
                            <Entity
                                html={
                                    currentSong.title ?? currentSong.name ?? ""
                                }
                            />
                        </Heading>
                    </Link>
                    <div className="space-y-1">
                        <Link href={`/song/${currentSong.id}`}>
                            <Text className="text-md font-semibold">
                                From - <Entity html={currentSong.label} />
                            </Text>
                        </Link>
                        <Text className="text-md font-semibold">
                            Album -{" "}
                            <Link
                                href={`/album/${currentSong.album.id}`}
                                className="hover:underline"
                            >
                                <Entity html={currentSong.album.name} />
                            </Link>
                        </Text>
                    </div>
                    <Text className="text-sm text-secondary-foreground">
                        {getSongArtists(
                            currentSong.artists?.primary,
                            currentSong.description
                        )}
                    </Text>
                    <div className="my-6 space-y-2">
                        <Text className="text text-secondary-foreground capitalize">
                            {currentSong.year} •{" "}
                            <Entity html={currentSong.language} />
                        </Text>
                        <Text className="text text-secondary-foreground">
                            <Entity html={currentSong.copyright} />
                        </Text>
                    </div>
                    <Heading
                        level={3}
                        className="text-md font-semibold text-secondary-foreground"
                    >
                        Download the song
                    </Heading>
                    <div className="">
                        {currentSong.downloadUrl
                            .toReversed()
                            .map((download) => (
                                <DownloadTab
                                    {...download}
                                    name={
                                        currentSong.title ??
                                        currentSong.name ??
                                        ""
                                    }
                                    duration={currentSong.duration}
                                    key={download.quality}
                                />
                            ))}
                    </div>
                </ScreenOffset>
            </PalettesBox>
        </>
    );
}

export default InfoPalette;

function DownloadTab({
    quality,
    url,
    name,
    duration,
}: MediaDownloadURL & { duration: number; name: string }) {
    return (
        <button
            type="button"
            className={cn(
                "flex w-full items-center gap-2 p-2 rounded-lg hover:bg-accent"
            )}
            onClick={() => {
                downloadFromLink(url, name, quality);
            }}
        >
            <Lucide.Download size={18} className="w-10" />
            <Text className="font-semibold flex-1 text-left">{quality}</Text>
            <Text className="text-secondary-foreground text-sm">
                {calculateFileSize(duration, quality)}
            </Text>
        </button>
    );
}
