import ServerBox from "@/components/layout/server";
import Log from "@/components/log";
import Parser from "@/helpers/parser";
import Saavn from "@/helpers/saavn";
import { PageProps } from "@/types/args";
import React from "react";
import ArtistPage from "./_artist";

export default async function Page({ params }: PageProps<{ id: string }>) {
    const result = await Saavn.artist(params.id);

    const artist = result.success && result.data;

    return (
        <ServerBox data={result}>
            <Log logs={[params.id, Parser.server(result)]} />
            {artist && <ArtistPage artist={artist} />}
        </ServerBox>
    );
}
