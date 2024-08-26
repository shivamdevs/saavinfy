"use client";

import SafeArea from "@/components/layout/safe-area";
import LucideSearch from "@/components/lucide/search";
import LucideX from "@/components/lucide/x";
import RoundButton from "@/components/tokens/button";
import { Heading, MonoSpan, Text } from "@/components/tokens/typography";
import useLibrary from "@/contexts/library";
import { cn, formatDateAndTime } from "@/lib/utils";
import { LibrarySearchHistory } from "@/types/library";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useInterval } from "react-unique-hooks";

function StartSearch() {
    const library = useLibrary();
    return (
        <SafeArea className="flex absolute inset-0">
            <div className="flex-[3] flex-center flex-col gap-5">
                <Heading
                    level={2}
                    className="text-4xl font-semibold text-primary"
                >
                    Start Searching
                </Heading>
                <Heading level={3} className="text-lg font-medium">
                    Search for a song, artist, album, or playlist
                </Heading>
                <LucideSearch
                    size={320}
                    className="text-secondary-foreground"
                />
            </div>
            {library.searches.length > 0 && (
                <div className="flex-[2] pt-3 flex flex-col">
                    <Heading
                        level={3}
                        className="text-2xl font-semibold pb-3 text-secondary-foreground"
                    >
                        Search history
                    </Heading>
                    <div className="flex-1 relative">
                        <div className="absolute inset-0 overflow-auto pr-2">
                            {library.searches
                                .sort((a, b) => b.date - a.date)
                                .map((search, index) => (
                                    <HistoryTab
                                        key={search.id}
                                        index={index}
                                        {...search}
                                        query={decodeURIComponent(
                                            search.query
                                        ).replace(/\+/g, " ")}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </SafeArea>
    );
}

export default StartSearch;

function HistoryTab({
    id,
    query,
    type,
    date,
    index,
}: LibrarySearchHistory & { index: number }) {
    const [time, setTime] = React.useState(formatDateAndTime(date, true));
    const library = useLibrary();

    useInterval(() => {
        setTime(formatDateAndTime(date, true));
    }, 1000);

    return (
        <div className="flex items-center gap-3 px-3 h-12 rounded-lg relative hover:bg-accent focus-within:bg-accent transition-all group">
            <div className="flex-1 inline-block">
                <Text className="line-clamp-1">{query}</Text>
            </div>
            <div className="text-sm text-secondary-foreground flex-1 inline-flex">
                <Text className="line-clamp-1">
                    {`${type || "top"} • ${time}`}
                </Text>
            </div>
            <div className="w-10 flex-center">
                <MonoSpan className="group-hover:hidden group-focus-within:hidden">
                    {index + 1}
                </MonoSpan>
                <RoundButton
                    size={36}
                    className={cn(
                        "group-hover:flex group-focus-within:flex hidden relative z-10",
                        "hover:!bg-card focus-visible:!bg-card"
                    )}
                    onClick={() => {
                        library.removeSearch(id);
                    }}
                >
                    <LucideX size={16} />
                </RoundButton>
            </div>
            <Link
                href={`/search/${query.trim().replace(/\s+/g, "+")}${type ? `/${type}` : ""}`}
                className="absolute inset-0"
                onClick={() => {
                    library.addSearch(query, type);
                }}
            />
        </div>
    );
}
