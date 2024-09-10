import { SearchResult } from "@/types/search";
import React from "react";
import TopSong from "./top-song";
import TopResultItem from "./top-result";

export default function TopResult({
    top,
    songs,
}: {
    top?: SearchResult["topQuery"]["results"][0];
    songs: SearchResult["songs"]["results"];
}) {
    if (!top && songs.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-row gap-10 mt-5">
            {top && (
                <div className="flex flex-col flex-1">
                    <h3 className="capitalize text-2xl my-5 px-4 font-semibold">
                        Top Result
                    </h3>
                    <TopResultItem item={top} />
                </div>
            )}
            <div className="flex flex-col flex-[2]">
                <h3 className="capitalize text-2xl my-5 px-4 font-semibold">
                    Songs
                </h3>
                <div className="">
                    {songs.map((item) => (
                        <TopSong key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
