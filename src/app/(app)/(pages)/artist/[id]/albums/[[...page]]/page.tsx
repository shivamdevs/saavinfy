import ServerBox from "@/components/layout/server";
import Log from "@/components/log";
import Parser from "@/helpers/parser";
import Saavn from "@/helpers/saavn";
import { PageProps } from "@/types/args";
import React from "react";
import ArtistAlbumsPage from "../_albums";

export default async function Page({
    params,
}: PageProps<{ id: string; page?: string[] }>) {
    const result = await Saavn.artistAlbums(
        params.id,
        Parser.int(params.page?.[0], 1),
        40
    );

    const albums = result.success && result.data;

    return (
        <ServerBox data={result}>
            <Log logs={[params.id, Parser.server(result)]} />
            {albums && (
                <ArtistAlbumsPage
                    albums={albums}
                    page={Parser.int(params.page?.[0], 1)}
                    artist={params.id}
                />
            )}
        </ServerBox>
    );
}
