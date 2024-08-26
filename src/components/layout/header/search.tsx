"use client";

import React, { useEffect, useMemo } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import LucideSearch from "../../lucide/search";
import LucideX from "../../lucide/x";
import { useDebounce } from "react-unique-hooks";

function Search() {
    const router = useRouter();
    const params = useParams<{ slug?: [query: string, type: string] }>();
    const pathname = usePathname();

    const [query, setQuery] = React.useState<string>(
        decodeURIComponent(params.slug?.[0] ?? "").replace(/\+/g, " ")
    );

    const searchType = useMemo(() => {
        const allowedTypes = ["", "songs", "albums", "artists", "playlists"];

        const type = params.slug?.[1] ?? "";

        if (type && allowedTypes.includes(type)) {
            return `/${type}`;
        }

        return "";
    }, [params.slug]);

    useEffect(() => {
        if (params.slug?.[0] && !query) {
            setQuery(decodeURIComponent(params.slug[0]).replace(/\+/g, " "));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.slug]);

    useDebounce(
        () => {
            if (query.length === 0) {
                router.replace("/search");
            } else {
                router.replace(
                    `/search/${query.trim().replace(/\s+/g, "+")}/${searchType}`
                );
            }
        },
        300,
        [query]
    );

    if (!pathname.startsWith("/search")) {
        return null;
    }

    const updateQuery = (value: string) => {
        setQuery(value);
    };

    return (
        <form
            role="search"
            onSubmit={(e) => {
                e.preventDefault();
            }}
            className={cn(
                "w-full max-w-[480px] relative overflow-hidden rounded-full h-[calc(3rem-2px)",
                "bg-secondary border border-secondary [&:has(input:focus)]:border-primary",
                "transition-all"
            )}
        >
            <input
                type="search"
                placeholder="Search"
                className={cn(
                    "bg-transparent px-12 py-[calc(0.75rem-1px)] w-full outline-none h-full"
                )}
                autoFocus
                value={query}
                onChange={(e) => updateQuery(e.target.value)}
            />

            <LucideSearch
                className="absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none text-secondary-foreground"
                size={20}
            />
            {query.length > 0 && (
                <button
                    type="reset"
                    className={cn(
                        "absolute top-[2px] right-[2px] bottom-[2px] aspect-square flex-center rounded-full",
                        "focus-visible:bg-black/20 hover:bg-black/20"
                    )}
                    onClick={() => {
                        updateQuery("");
                        router.replace("/search");
                    }}
                >
                    <LucideX size={20} />
                </button>
            )}
        </form>
    );
}

export default Search;
