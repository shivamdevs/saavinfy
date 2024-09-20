import ServerBox from "@/components/layout/server";
import Log from "@/components/log";
import Parser from "@/helpers/parser";
import Saavn from "@/helpers/saavn";
import Saves from "@/helpers/saves";
import { cookies } from "next/headers";
import React from "react";
import { SongList } from "@/components/blocks/song";
import BlockGridList from "@/components/blocks/grid";
import historyTrending from "@/app/api/_history";

// import { MediaAlbum, MediaArtist, MediaSong } from "@/types/media";
// import { ServerError, ServerResponse } from "@/modules/server";

export default async function Page() {
    const { history } = Saves.getLibrary(cookies);

    if (!history.length) {
        const songs = await historyTrending();
        history.push(...songs.map((s) => ({ song: s, date: Date.now() })));
    }

    // const result = new ServerError(
    //     "No trending songs found",
    //     "No trending songs found"
    // );

    const result = await Saavn.getTrending(
        history
            .sort((a, b) => b.date - a.date)
            .slice(0, 3)
            .map((h) => h.song)
    );

    const songs = result.success && result.data.songs;
    const albums = result.success && result.data.albums;
    const artists = result.success && result.data.artists;

    return (
        <ServerBox data={result}>
            <Log logs={[history, Parser.server(result)]} />
            <div className="p-5">
                {albums && <BlockGridList title="Albums" items={albums} />}
                {songs && (
                    <div>
                        <h3 className="capitalize text-2xl my-5 px-4 font-semibold">
                            Songs
                        </h3>
                        <SongList items={songs} />
                    </div>
                )}
                {artists && <BlockGridList title="Artists" items={artists} />}
            </div>
        </ServerBox>
    );
}
