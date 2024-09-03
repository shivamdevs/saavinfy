import ErrorBox from "@/components/layout/error";
import Saavn from "@/helpers/saavn";
import { PageProps } from "@/types/args";
import React from "react";
import { SearchArtist, SearchResultFor } from "@/types/search";
import Log from "@/components/log";
import GridList from "../../../_components/grid";
import Parser from "@/helpers/parser";
import Paged from "@/components/ui/pagination";
import Searcher from "@/helpers/searcher";

export default async function Page({
    params,
}: PageProps<{ query?: string; page?: string[] }>) {
    const result = await Saavn.searchArtists(
        params.query || "",
        Parser.int(params.page?.[0], 1)
    );

    return (
        <ErrorBox data={result}>
            {result.success && (
                <Result data={result.data} query={params.query!} />
            )}
        </ErrorBox>
    );
}

function Result({
    data,
    query,
}: {
    data: SearchResultFor<SearchArtist>;
    query: string;
}) {
    return (
        <>
            <Log log={data} />

            <GridList items={data.results} />

            <Paged
                page={data.start}
                total={data.total}
                limit={30}
                href={(page) =>
                    `/search/${Searcher.recode(query)}/artists${page === 1 ? "" : `/${page}`}`
                }
            />
        </>
    );
}
