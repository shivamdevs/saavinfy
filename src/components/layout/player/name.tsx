"use client";

import BlockDescription from "@/components/blocks/description";
import BlockImage from "@/components/blocks/image";
import BlockTitle from "@/components/blocks/title";
import Lucide from "@/components/lucide";
import { Button } from "@/components/ui/button";
import Tippy from "@/components/ui/tooltip";
import useLibrary from "@/contexts/library";
import usePlayer from "@/contexts/player";
import { cn } from "@/lib/utils";
import React from "react";

export default function PlayerName() {
    const player = usePlayer();
    const library = useLibrary();

    const item = player.currentSong;

    if (!item) {
        return null;
    }

    return (
        <div className="flex items-center gap-4">
            <BlockImage src={item.image} alt={item.title} size={48} show />
            <div className="flex flex-col justify-center">
                <BlockTitle item={item} className="text-base" />
                <BlockDescription item={item} className="text-sm" />
            </div>
            <div className="inline-flex">
                <Tippy
                    content={
                        library.isFavorite(item.id)
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                >
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className={cn("rounded-full", {
                            "!text-primary": library.isFavorite(item.id),
                        })}
                        onClick={() => library.toggleFavorite(item.id)}
                    >
                        <Lucide.Heart
                            size={18}
                            fill={
                                library.isFavorite(item.id)
                                    ? "currentColor"
                                    : "none"
                            }
                        />
                    </Button>
                </Tippy>
            </div>
        </div>
    );
}
