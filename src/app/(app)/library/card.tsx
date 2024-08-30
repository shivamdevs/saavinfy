import PlayButton from "@/components/tokens/play";
import { Heading, Text } from "@/components/tokens/typography";
import useColors from "@/contexts/hooks/use-colors";
import usePlayer from "@/contexts/player";
import { formatDateAndTime, formatPlural } from "@/lib/utils";
import { MediaSong } from "@/types/media";
import Image from "next/image";
import React from "react";

export type LibraryCardProps = {
    image: string;
    title: string;
    songs: MediaSong[];
    date: number;
};

function LibraryCard({ image, title, songs, date }: LibraryCardProps) {
    const colors = useColors(image);
    const player = usePlayer();

    return (
        <div
            className="pt-[2rem] pb-[22rem] px-10"
            style={{
                backgroundColor: colors.background,
                color: colors.isDark ? "white" : "black",
            }}
        >
            <div className="flex items-center gap-20 relative group">
                <Image
                    className="rounded-lg shadow-2xl"
                    width={320}
                    height={320}
                    src={image}
                    alt={title}
                />
                <div className="flex flex-col text-6xl font-bold gap-4 self-stretch">
                    <Heading level={2} className=" mt-auto">
                        {title}
                    </Heading>
                    <Text className="text-2xl opacity-70 font-medium">
                        {songs.length} {formatPlural(songs.length, "song")} •
                        Last updated {formatDateAndTime(date)}
                    </Text>
                    <PlayButton
                        size={64}
                        className="opacity-100 static mt-auto mb-0 shadow-2xl"
                        onClick={() => {
                            player.addSongs(songs, true, true);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default LibraryCard;
