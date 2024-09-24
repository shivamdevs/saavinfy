import ServerBox from "@/components/layout/server";
import Log from "@/components/log";
import Parser from "@/helpers/parser";
import Saavn from "@/helpers/saavn";
import { PageProps } from "@/types/args";
import React from "react";
import SongPage from "../_song";

export default async function Page({ params }: PageProps<{ id: string }>) {
    const result = await Saavn.getSongs(params.id);

    const song = result.success && result.data.at(0);

    return (
        <ServerBox data={result}>
            <Log logs={[params.id, Parser.server(result)]} />
            {song && <SongPage song={song} />}
        </ServerBox>
    );
}
