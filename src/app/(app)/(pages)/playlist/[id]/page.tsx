import ServerBox from "@/components/layout/server";
import Log from "@/components/log";
import Parser from "@/helpers/parser";
import Saavn from "@/helpers/saavn";
import { PageProps } from "@/types/args";
import React from "react";
import SongPage from "../_playlist";

export default async function Page({ params }: PageProps<{ id: string }>) {
    const result = await Saavn.playlist(params.id, 1, 9999);

    const playlist = result.success && result.data;

    return (
        <ServerBox data={result}>
            <Log logs={[params.id, Parser.server(result)]} />
            {playlist && <SongPage playlist={playlist} />}
        </ServerBox>
    );
}
