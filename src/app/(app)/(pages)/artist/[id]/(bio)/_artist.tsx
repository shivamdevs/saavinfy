import React from "react";
import { MediaArtist } from "@/types/media";
import BlockCard from "@/components/blocks/card";
import { SongList } from "@/components/blocks/song";
import BlockGridList from "@/components/blocks/grid";
import BlockImage from "@/components/blocks/image";
import Lucide from "@/components/lucide";
import Parser from "@/helpers/parser";
import Tippy from "@/components/ui/tooltip";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ArtistPage({ artist }: { artist: MediaArtist }) {
    return (
        <BlockCard
            item={artist}
            type="artist"
            float={
                <div>
                    <Button
                        asChild
                        variant="link"
                        className="rounded-full text-primary-foreground"
                    >
                        <Link href={`/artist/${artist.id}/songs`}>
                            All Songs
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="link"
                        className="rounded-full text-primary-foreground"
                    >
                        <Link href={`/artist/${artist.id}/albums`}>
                            All Albums
                        </Link>
                    </Button>
                </div>
            }
        >
            {artist.topSongs.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold mt-10 mb-4">
                        Popular
                    </h3>
                    <SongList items={artist.topSongs} />
                </>
            )}
            {artist.topAlbums.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold mt-10">
                        Popular releases
                    </h3>
                    <BlockGridList items={artist.topAlbums} small />
                </>
            )}

            {artist.singles.length > 0 && (
                <>
                    <h3 className="text-xl font-semibold mt-10">Singles</h3>
                    <BlockGridList items={artist.singles} small />
                </>
            )}
            <div className="bg-secondary shadow-sm w-4/5 min-h-96 mb-10 rounded-2xl hover:scale-[1.01] transition-all p-5 flex gap-5 items-center">
                <BlockImage
                    src={artist.image}
                    alt={artist.name}
                    size={240}
                    className="rounded-full shadow-lg"
                />
                <div className="flex flex-col flex-1 gap-5">
                    <h2 className="text-4xl font-semibold">{artist.name}</h2>
                    {/* Birthday */}
                    {artist.dob && (
                        <h3 className="font-semibold inline-flex items-center gap-4">
                            <Lucide.Cake className="size-5 -mt-1" />
                            {artist.dob}
                        </h3>
                    )}
                    <h4 className="font-semibold capitalize">
                        {artist.availableLanguages.join(", ")}
                    </h4>
                    <p className="text-secondary-foreground">
                        {Parser.numeric(artist.followerCount)} followers •{" "}
                        {Parser.numeric(artist.fanCount)} fans
                    </p>
                </div>
                <div className="inline-flex items-center flex-col self-end gap-5">
                    {artist.fb && (
                        <Tippy content="Facebook">
                            <a
                                href={artist.fb}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-all hover:text-primary"
                            >
                                <Lucide.Facebook
                                    className="size-6"
                                    fill="currentColor"
                                />
                            </a>
                        </Tippy>
                    )}
                    {artist.twitter && (
                        <Tippy content="Twitter">
                            <a
                                href={artist.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-all hover:text-primary"
                            >
                                <Lucide.Twitter
                                    className="size-6"
                                    fill="currentColor"
                                />
                            </a>
                        </Tippy>
                    )}
                    {artist.wiki && (
                        <Tippy content="Wikipedia">
                            <a
                                href={artist.wiki}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-all hover:text-primary"
                            >
                                <Lucide.Globe className="size-6" />
                            </a>
                        </Tippy>
                    )}
                </div>
            </div>
        </BlockCard>
    );
}
