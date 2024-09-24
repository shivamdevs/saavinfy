"use client";

import React from "react";
import OverlayHeader from "./_header";
import OverlayContent from "./_content";
import usePlayer from "@/contexts/player";
import useColors from "@/contexts/hooks/use-colors";
import BlockImage from "@/components/blocks/image";
import { calculateFileSize, cn } from "@/lib/utils";
import Parser from "@/helpers/parser";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Lucide from "@/components/lucide";
import { MediaDownloadURL } from "@/types/media";
import downloadFromLink from "@/lib/download";
import useStack from "@/contexts/stack";

export default function OverlayInfo() {
    const player = usePlayer();

    const item = player.currentSong;

    const colors = useColors(item?.image);

    if (!item) {
        return null;
    }

    return (
        <>
            <OverlayHeader title="Playing now" />
            <OverlayContent>
                <div
                    className={"w-full"}
                    style={{
                        backgroundColor: colors?.background,
                    }}
                >
                    <Link href={`/song/${item.id}`}>
                        <div className="flex-center p-10">
                            <BlockImage
                                src={item.image}
                                alt={item.name}
                                size={280}
                                className="shadow-lg"
                            />
                        </div>
                    </Link>
                    <div className="p-5 bg-gradient-to-b from-background/10 via-[10rem] via-background to-background min-h-96">
                        <div
                            className={cn(
                                "mb-5",
                                colors.result &&
                                    (colors.isDark
                                        ? "text-white"
                                        : "text-black")
                            )}
                        >
                            <h3 className="text-2xl font-bold">
                                {Parser.entity(item.name)}
                            </h3>
                        </div>
                        <Button asChild variant="secondary" className="w-full">
                            <Link href={`/song/${item.id}`}>
                                <Lucide.Disc3 size={18} className="mr-3" />
                                Open song info
                            </Link>
                        </Button>
                        <div className="mt-5">
                            <h4 className="my-5 text-lg font-semibold">
                                Download this song
                            </h4>
                            {item.downloadUrl.toReversed().map((download) => (
                                <DownloadTab
                                    {...download}
                                    name={item.title ?? item.name ?? ""}
                                    id={item.id}
                                    duration={item.duration}
                                    key={download.quality}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </OverlayContent>
        </>
    );
}

function DownloadTab({
    quality,
    url,
    id,
    name,
    duration,
}: MediaDownloadURL & { duration: number; name: string; id: string }) {
    const { newStack } = useStack();

    return (
        <button
            type="button"
            className={cn(
                "flex w-full items-center gap-2 p-2 rounded-lg hover:bg-accent"
            )}
            onClick={() => {
                const stack = newStack(
                    `download/${id}/${quality}`,
                    `Downloading ${name} in ${quality}.`,
                    { type: "loading", progress: 0, count: duration }
                );

                downloadFromLink(url, name, quality, stack);
            }}
        >
            <Lucide.Download size={18} className="w-10" />
            <p className="font-semibold flex-1 text-left">{quality}</p>
            <p className="text-secondary-foreground text-sm">
                {calculateFileSize(duration, quality)}
            </p>
        </button>
    );
}
