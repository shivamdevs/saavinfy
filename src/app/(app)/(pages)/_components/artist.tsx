import React from "react";
import { MediaInlineArtist, MediaInlineArtists } from "@/types/media";
import BlockImage from "@/components/blocks/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Parser from "@/helpers/parser";

export default function ArtistList({
    artists,
}: {
    artists: MediaInlineArtists;
}) {
    return (
        <div className="my-5">
            <h3 className="mb-2 pl-2 text-lg font-semibold">
                Primary {Parser.plural(artists.primary.length, "Artist")}
            </h3>
            <div className="flex flex-row flex-wrap gap-4">
                {artists.primary.map((artist) => (
                    <ArtistCard key={artist.id} item={artist} />
                ))}
            </div>
            {artists.featured.length > 0 && (
                <>
                    <h3 className="mb-2 pl-2 text-lg font-semibold">
                        Featured{" "}
                        {Parser.plural(artists.featured.length, "Artist")}
                    </h3>
                    <div className="flex flex-row flex-wrap gap-4">
                        {artists.featured.map((artist) => (
                            <ArtistCard key={artist.id} item={artist} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function ArtistCard({ item }: { item: MediaInlineArtist }) {
    return (
        <Card
            {...Object.entries(item).reduce(
                (acc, [key, value]) =>
                    typeof value === "string"
                        ? { ...acc, [`data-${key.toLowerCase()}`]: value }
                        : acc,
                {}
            )}
            className="group relative border-0 bg-background/20"
            asLink
        >
            <Link
                href={`/artist/${item.id}`}
                aria-label={`View ${item.name}`}
                className="flex items-center py-2 px-4 gap-4"
            >
                <BlockImage
                    src={item.image}
                    alt={item.name}
                    size={40}
                    className="rounded-full"
                />
                <p className="">{item.name}</p>
            </Link>
        </Card>
    );
}
