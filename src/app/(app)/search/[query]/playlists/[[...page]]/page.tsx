import ServerBox from "@/components/layout/server";
import Saavn from "@/helpers/saavn";
import { PageProps } from "@/types/args";
import React from "react";
import { SearchPlaylist, SearchResultFor } from "@/types/search";
import Log from "@/components/log";
import Parser from "@/helpers/parser";
import Paged from "@/components/ui/pagination";
import Searcher from "@/helpers/searcher";
import BlockGridList from "@/components/blocks/grid";

export default async function Page({
    params,
}: PageProps<{ query?: string; page?: string[] }>) {
    const result = await Saavn.searchPlaylists(
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
    data: SearchResultFor<SearchPlaylist>;
    query: string;
}) {
    return (
        <>
            <Log log={data} />

            <BlockGridList items={data.results} />

            <Paged
                page={data.start}
                total={data.total}
                limit={30}
                href={(page) =>
                    `/search/${Searcher.recode(query)}/playlists${page === 1 ? "" : `/${page}`}`
                }
            />
        </>
    );
}
