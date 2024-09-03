import ErrorBox from "@/components/layout/error";
import Saavn from "@/helpers/saavn";
import { PageProps } from "@/types/args";
import React from "react";
import TopResult from "../../_components/top";
import { SearchResult } from "@/types/search";
import GridList from "../../_components/grid";
import Log from "@/components/log";

export default async function Page({ params }: PageProps<{ query?: string }>) {
    const result = await Saavn.searchAll(params.query || "");

    return (
        <ErrorBox data={result}>
            {result.success && <Result data={result.data} />}
        </ErrorBox>
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
                    <GridList key={key} title={key} items={value.results} />
                ))}
        </>
    );
}
