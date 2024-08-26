"use client";

import ItemCard from "@/components/tokens/card";
import ErrorBox from "@/components/layout/error";
import ItemsGrid from "@/components/tokens/grid";
import { Endpoints } from "@/config/endpoints";
import { CallResponse } from "@/lib/call";
import {
    SearchAlbum,
    SearchArtist,
    SearchPlaylist,
    SearchResult,
    SearchResultFor,
} from "@/types/search";
import React from "react";
import useSWR from "swr";
import SongList from "@/components/tokens/list";
import { MediaSong } from "@/types/media";
import TopResult from "@/components/tokens/top";
import useFetchAndPlay from "@/contexts/hooks/use-play";
import useLibrary from "@/contexts/library";
import { useParams } from "next/navigation";

export type SearchResultsProps = {
    query: string;
    type: string;
};

function SearchResults({ query, type }: SearchResultsProps) {
    // eslint-disable-next-line no-unused-vars
    const [page, setPage] = React.useState(1);
    // eslint-disable-next-line no-unused-vars
    const [limit, setLimit] = React.useState(30);

    const res = useSWR<CallResponse>(
        Endpoints.search(query, type, page, limit)
    );

    if (res.isLoading) {
        return null;
    }

    const data = res.data!;

    return (
        <ErrorBox data={data}>
            <Response data={data.data} type={type.replace("/", "")} />
        </ErrorBox>
    );
}

export default SearchResults;

function Response({ data, type }: { data: unknown; type: string }) {
    const fetchPlay = useFetchAndPlay();
    const library = useLibrary();

    const params = useParams<{ slug?: [query: string] }>();

    if (type === "songs") {
        return (
            <SongList
                items={(data as SearchResultFor<MediaSong>).results}
                addToSearch={{
                    query: params.slug?.[0]!,
                    type: type,
                }}
            />
        );
    }

    if (type === "albums") {
        return (
            <ItemsGrid title="Albums">
                {(data as SearchResultFor<SearchAlbum>).results.map((album) => (
                    <ItemCard
                        key={album.id}
                        item={album}
                        type="album"
                        onPlay={() => {
                            fetchPlay.album(album);
                            library.addSearch(params.slug?.[0]!, type);
                        }}
                    />
                ))}
            </ItemsGrid>
        );
    }

    if (type === "artists") {
        return (
            <ItemsGrid title="Artists">
                {(data as SearchResultFor<SearchArtist>).results.map(
                    (artist) => (
                        <ItemCard
                            key={artist.id}
                            item={artist}
                            type="artist"
                            hidePlay={
                                !!artist.songCount &&
                                (artist.songCount === 0 ||
                                    artist.songCount > 10)
                            }
                            onPlay={() => {
                                fetchPlay.artistSongs(artist);
                                library.addSearch(params.slug?.[0]!, type);
                            }}
                        />
                    )
                )}
            </ItemsGrid>
        );
    }

    if (type === "playlists") {
        return (
            <ItemsGrid title="Playlists">
                {(data as SearchResultFor<SearchPlaylist>).results.map(
                    (playlist) => (
                        <ItemCard
                            key={playlist.id}
                            item={playlist}
                            type="playlist"
                            onPlay={() => {
                                fetchPlay.playlist(playlist);
                                library.addSearch(params.slug?.[0]!, type);
                            }}
                        />
                    )
                )}
            </ItemsGrid>
        );
    }

    const topResult = (data as SearchResult).topQuery.results.at(0);
    const songs = (data as SearchResult).songs
        .results as unknown as MediaSong[];

    return (
        <>
            <TopResult
                item={topResult}
                songs={songs}
                addToSearch={{
                    query: params.slug?.[0]!,
                    type: "",
                }}
            />
            {Object.entries(data as SearchResult)
                .toSorted((a, b) => a[1].position - b[1].position)
                .filter(
                    ([key, value]) =>
                        value.results.length > 0 &&
                        key !== "topQuery" &&
                        key !== "songs"
                )
                .map(([key, value]) => (
                    <ItemsGrid
                        title={key}
                        key={key}
                        data-key={key}
                        data-pos={value.position}
                    >
                        {value.results.map((result) => (
                            <ItemCard key={result.id} item={result} />
                        ))}
                    </ItemsGrid>
                ))}
        </>
    );
}
