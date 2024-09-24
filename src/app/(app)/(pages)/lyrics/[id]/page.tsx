import ServerBox from "@/components/layout/server";
import Log from "@/components/log";
import Parser from "@/helpers/parser";
import Saavn from "@/helpers/saavn";
import { PageProps } from "@/types/args";
import React from "react";
import MicDropPage from "../page";
import LyricsPage from "./_lyrics";

export default async function Page({ params }: PageProps<{ id: string }>) {
    const result = await Saavn.lyrics(params.id);

    const lyrics = result.success && result.data;

    return (
        <ServerBox data={result} fallback={<MicDropPage />}>
            <Log logs={[params.id, Parser.server(result)]} />

            {lyrics && <LyricsPage lyrics={lyrics} />}
        </ServerBox>
    );
}
