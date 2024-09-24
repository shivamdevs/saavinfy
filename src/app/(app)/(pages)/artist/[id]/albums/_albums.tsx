import React from "react";
import { MediaArtistAlbums } from "@/types/media";
import Paged from "@/components/ui/pagination";
import Parser from "@/helpers/parser";
import BlockGridList from "@/components/blocks/grid";

export default function ArtistAlbumPage({
    albums,
    page,
    artist,
}: {
    albums: MediaArtistAlbums;
    page: number;
    artist: string;
}) {
    return (
        <div className="px-5 py-10">
            <h2 className="text-2xl font-semibold pl-2 my-4">
                {40 * page - 39} - {Math.min(40 * page, albums.total)} /{" "}
                {albums.total} {Parser.plural(albums.total, "Album")}
            </h2>
            <BlockGridList items={albums.albums} small />

            <span className="block h-8" />

            <Paged
                page={page * 40 - 39}
                total={albums.total}
                limit={40}
                href={(page) =>
                    `/artist/${artist}/albums${page === 1 ? "" : `/${page}`}`
                }
            />
        </div>
    );
}
