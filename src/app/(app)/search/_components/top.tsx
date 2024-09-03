import BlockDescription from "@/components/blocks/description";
import BlockImage from "@/components/blocks/image";
import BlockTitle from "@/components/blocks/title";
import { Card } from "@/components/ui/card";
import { SearchResult } from "@/types/search";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import Parser from "@/helpers/parser";
import PullPlay from "@/components/blocks/play";

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
        <div className="flex flex-row gap-10">
            {top && <Top item={top} />}
            <div className="flex flex-col flex-[2]">
                <h3 className="capitalize text-2xl my-5 px-4 font-semibold">
                    Top Result
                </h3>
                <div className="">
                    {songs.map((item) => (
                        <Song key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Top({ item }: { item: SearchResult["topQuery"]["results"][0] }) {
    return (
        <div className="flex flex-col flex-1">
            <h3 className="capitalize text-2xl my-5 px-4 font-semibold">
                Top Result
            </h3>
            <Card className="group relative" asLink>
                <Link
                    href={`/${item.type}/${item.id}`}
                    className="p-5 flex flex-col gap-4"
                >
                    <BlockImage src={item.image} alt={item.title} size={120} />
                    <BlockTitle item={item} className="text-4xl" />
                    <BlockDescription item={item} />
                </Link>
                <PullPlay item={item} className="right-6 bottom-6" />
            </Card>
        </div>
    );
}

function Song({ item }: { item: SearchResult["songs"]["results"][0] }) {
    return (
        <Card
            {...Object.entries(item).reduce(
                (acc, [key, value]) =>
                    typeof value === "string"
                        ? { ...acc, [`data-${key.toLowerCase()}`]: value }
                        : acc,
                {}
            )}
            className="flex-1 group relative border-0 flex items-center"
            asLink
        >
            <Link
                href={`/song/${item.id}`}
                className="p-2 flex flex-1 gap-4 items-center"
            >
                <BlockImage src={item.image} alt={item.title} size={48}>
                    <PullPlay item={item} inset />
                </BlockImage>
                <div className="flex flex-col flex-1 justify-center">
                    <BlockTitle item={item} className="text-base" />
                    <BlockDescription item={item} className="text-sm" />
                </div>
                <BlockDescription
                    className="flex-1 capitalize text-sm"
                    item={item}
                >
                    {Parser.entity(item.language)} • {Parser.entity(item.album)}
                </BlockDescription>
            </Link>
        </Card>
    );
}
