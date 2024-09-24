"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Searcher from "@/helpers/searcher";
import { useDebounce } from "react-unique-hooks";
import Lucide from "@/components/lucide";

export default function PartSearch() {
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams<{
        query?: string;
    }>();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const isSearchPage = pathname.startsWith("/search");

    const [value, setValue] = React.useState(
        Searcher.decode(params.query ?? "")
    );

    useEffect(() => {
        if (!params.query) {
            setValue("");
        }
    }, [params.query]);

    useDebounce(
        () => {
            if (value.length === 0) {
                if (isSearchPage) {
                    router.replace("/search");
                }
            } else {
                const [, , , type] = pathname.split("/");
                router.replace(
                    `/search/${Searcher.encode(value)}/${type ? type : ""}`
                );
            }
        },
        320,
        [value]
    );

    return (
        <form
            className="flex-1 max-w-[512px] rounded-full relative"
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <input
                type="search"
                placeholder="Search for songs, albums, artists, playlists..."
                ref={inputRef}
                className={cn("py-3 px-12 rounded-full", " w-full min-w-full")}
                autoFocus={isSearchPage}
                value={value}
                onFocus={() => {
                    if (!isSearchPage) {
                        router.push("/search");
                    }
                }}
                onChange={(e) => setValue(e.target.value)}
            />
            <Lucide.Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-foreground/40 pointer-events-none" />
            {value.trim().length > 0 && (
                <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
                    onClick={() => {
                        setValue("");
                        router.replace("/search");
                    }}
                >
                    <Lucide.X />
                </Button>
            )}
        </form>
    );
}
