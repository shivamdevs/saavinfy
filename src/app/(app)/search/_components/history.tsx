"use client";

import React from "react";
import Lucide from "@/components/lucide";
import { List } from "@/components/magicui/list";
import { Button } from "@/components/ui/button";
import useAgo from "@/contexts/hooks/use-ago";
import useLibrary from "@/contexts/library";
import Searcher from "@/helpers/searcher";
import Link from "next/link";

export default function History() {
    const library = useLibrary();
    const getAgo = useAgo();

    if (!library.searches.length) {
        return null;
    }

    return (
        <div className="w-full max-w-[480px] space-y-2">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-secondary-foreground mb-4">
                    Search History
                </h3>
                <Button
                    variant="link"
                    onClick={() => {
                        library.clearSearches();
                    }}
                >
                    Clear All
                </Button>
            </div>
            <List>
                {library.searches
                    .sort((a, b) => b.date - a.date)
                    .map((search) => {
                        const href = `/search/${search.query}/${search.type}`;

                        return (
                            <div className="group relative" key={search.id}>
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="w-full justify-between"
                                >
                                    <Link
                                        href={href}
                                        onClick={() => {
                                            library.addSearch(
                                                search.query,
                                                search.type
                                            );
                                        }}
                                    >
                                        <span className="">
                                            {Searcher.decode(search.query)}
                                        </span>
                                        <span className="text-secondary-foreground mr-8">
                                            {search.type || "all"} •{" "}
                                            {getAgo(search.date)}
                                        </span>
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="hidden group-hover:flex absolute z-[1] right-0 top-0"
                                    size="icon"
                                    onClick={() => {
                                        library.removeSearch(search.id);
                                    }}
                                >
                                    <Lucide.X />
                                </Button>
                            </div>
                        );
                    })}
            </List>
        </div>
    );
}
