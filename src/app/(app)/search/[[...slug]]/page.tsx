import React from "react";
import SearchResults from "./results";
import StartSearch from "./start";
import SafeArea from "@/components/layout/safe-area";
import FilterButton from "./filter";
import { getSearchFilter } from "@/lib/utils";

function Page({
    params,
}: {
    params?: { slug?: [query: string, type: string] };
}) {
    const [query, type] = params?.slug ?? ["", ""];

    if (!query) {
        return <StartSearch />;
    }

    return (
        <div className="flex-1">
            <SafeArea className="p-5">
                <div className="sticky top-16 flex flex-wrap gap-2 p-2 layout-card z-20 rounded-none">
                    <FilterButton
                        query={query}
                        type={type}
                        name="Top Results"
                        value=""
                    />
                    <FilterButton
                        query={query}
                        type={type}
                        name="Songs"
                        value="/songs"
                    />
                    <FilterButton
                        query={query}
                        type={type}
                        name="Albums"
                        value="/albums"
                    />
                    <FilterButton
                        query={query}
                        type={type}
                        name="Artists"
                        value="/artists"
                    />
                    <FilterButton
                        query={query}
                        type={type}
                        name="Playlists"
                        value="/playlists"
                    />
                </div>
                <SearchResults
                    query={decodeURIComponent(query)}
                    type={getSearchFilter(type)}
                />
            </SafeArea>
        </div>
    );
}

export default Page;
