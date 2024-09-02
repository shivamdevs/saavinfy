import React from "react";
import SearchResults from "../results";
import StartSearch from "../start";
import FilterButton from "../filter";
import { getSearchFilter } from "@/lib/utils";
import Search from "../search";

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
            <div className="sticky top-0 flex gap-5 p-2 layout-card z-20 rounded-none">
                <Search />
                <div className="flex flex-nowrap gap-2 overflow-hidden items-center">
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
            </div>
            <SearchResults
                query={decodeURIComponent(query)}
                type={getSearchFilter(type)}
            />
        </div>
    );
}

export default Page;
