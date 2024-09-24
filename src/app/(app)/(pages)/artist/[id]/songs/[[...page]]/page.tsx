import ServerBox from "@/components/layout/server";
import Log from "@/components/log";
import Parser from "@/helpers/parser";
import Saavn from "@/helpers/saavn";
import { PageProps } from "@/types/args";
import React from "react";
import ArtistSongsPage from "../_songs";

export default async function Page({
    params,
}: PageProps<{ id: string; page?: string[] }>) {
    const result = await Saavn.artistSongs(
        params.id,
        Parser.int(params.page?.[0], 1),
        30
    );

    const songs = result.success && result.data;

    return (
        <ServerBox data={result}>
            <Log logs={[params.id, Parser.server(result)]} />
            {songs && (
                <ArtistSongsPage
                    songs={songs}
                    page={Parser.int(params.page?.[0], 1)}
                    artist={params.id}
                />
            )}
        </ServerBox>
    );
}
