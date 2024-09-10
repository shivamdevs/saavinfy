import ServerBox from "@/components/layout/server";
import Saavn from "@/helpers/saavn";
import { PageProps } from "@/types/args";
import React from "react";
import TopResult from "../../_components/top";
import { SearchResult } from "@/types/search";
import Log from "@/components/log";
import BlockGridList from "@/components/blocks/grid";

export default async function Page({ params }: PageProps<{ query?: string }>) {
    const result = await Saavn.searchAll(params.query || "");

    return (
        <ServerBox data={result}>
            {result.success && <Result data={result.data} />}
        </ServerBox>
    );
}

function Result({ data }: { data: SearchResult }) {
    const topQuery = data.topQuery.results.at(0);

    return (
        <>
            <TopResult top={topQuery} songs={data.songs.results} />

            <Log log={data} />

            {Object.entries(data)
                .filter(
                    ([key, value]) =>
                        key !== "topQuery" &&
                        key !== "songs" &&
                        value.results.length > 0
                )
                .sort(([, a], [, b]) => a.position - b.position)
                .map(([key, value]) => (
                    <BlockGridList
                        key={key}
                        title={key}
                        items={value.results}
                    />
                ))}
        </>
    );
}
