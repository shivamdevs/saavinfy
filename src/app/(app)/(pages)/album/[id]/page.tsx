import ServerBox from "@/components/layout/server";
import Log from "@/components/log";
import Parser from "@/helpers/parser";
import Saavn from "@/helpers/saavn";
import { PageProps } from "@/types/args";
import React from "react";
import AlbumPage from "../_album";

export default async function Page({ params }: PageProps<{ id: string }>) {
    const result = await Saavn.album(params.id);

    const album = result.success && result.data;

    return (
        <ServerBox data={result}>
            <Log logs={[params.id, Parser.server(result)]} />
            {album && <AlbumPage album={album} />}
        </ServerBox>
    );
}
