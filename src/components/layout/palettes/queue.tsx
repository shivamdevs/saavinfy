import React from "react";
import PalettesHeader from "./header";
import SongList from "@/components/tokens/list";
import usePlayer from "@/contexts/player";
import { Heading } from "@/components/tokens/typography";
import PalettesBox from "./box";

function QueuePalette() {
    const player = usePlayer();

    const { currentSong } = player;

    const upNextSongs = currentSong
        ? player.queue.slice(
              player.queue.findIndex((song) => song.id === currentSong.id) + 1
          )
        : [];

    return (
        <>
            <PalettesHeader>Queue</PalettesHeader>
            {currentSong && (
                <PalettesBox className="py-5 px-2">
                    <Heading level={3} className="text-lg font-semibold mb-4">
                        Currently playing
                    </Heading>
                    <SongList
                        items={[currentSong]}
                        noHeader
                        noDuration
                        noAlbum
                        noIndex
                    />

                    {upNextSongs.length > 0 && (
                        <>
                            <Heading
                                level={3}
                                className="text-lg font-semibold mb-4 mt-8"
                            >
                                Up next
                            </Heading>
                            <SongList
                                items={upNextSongs}
                                noHeader
                                noIndex
                                noAlbum
                                asQueue
                                noDuration
                            />
                        </>
                    )}
                </PalettesBox>
            )}
        </>
    );
}

export default QueuePalette;
