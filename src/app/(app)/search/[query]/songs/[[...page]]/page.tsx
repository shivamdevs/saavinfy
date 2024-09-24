import ServerBox from "@/components/layout/server";
import Saavn from "@/helpers/saavn";
import { PageProps } from "@/types/args";
import React from "react";
import { SearchResultFor } from "@/types/search";
import Log from "@/components/log";
import Parser from "@/helpers/parser";
import Paged from "@/components/ui/pagination";
import Searcher from "@/helpers/searcher";
import { MediaSong } from "@/types/media";
import { SongList } from "@/components/blocks/song";

export default async function Page({
    params,
}: PageProps<{ query?: string; page?: string[] }>) {
    const result = await Saavn.searchSongs(
        params.query || "",
        Parser.int(params.page?.[0], 1)
    );

    return (
        <ServerBox data={result}>
            {result.success && (
                <Result data={result.data} query={params.query!} />
            )}
        </ServerBox>
    );
}

function Result({
    data,
    query,
}: {
    data: SearchResultFor<MediaSong>;
    query: string;
}) {
    return (
        <>
            <Log log={data} />

            <SongList items={data.results} className="py-10" />

            <span className="block h-8" />

            <Paged
                page={data.start}
                total={data.total}
                limit={30}
                href={(page) =>
                    `/search/${Searcher.recode(query)}/songs${page === 1 ? "" : `/${page}`}`
                }
            />
        </>
    );
}
