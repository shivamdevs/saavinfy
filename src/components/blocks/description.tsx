import Parser from "@/helpers/parser";
import { cn } from "@/lib/utils";
import { MediaItem, MediaSong } from "@/types/media";
import React from "react";
import Block from "./_blocks";

export type BlockDescriptionProps =
    React.HTMLAttributes<HTMLParagraphElement> & {
        item: MediaItem | MediaSong;
    };
export default function BlockDescription({
    item,
    className,
    children,
    ...props
}: BlockDescriptionProps) {
    return (
        <p
            className={cn(
                "text-base line-clamp-1 text-secondary-foreground",
                className
            )}
            {...props}
        >
            {children
                ? children
                : item.type === "song" && (item as MediaSong).downloadUrl
                  ? Block.songArtists((item as MediaSong).artists?.primary)
                  : Parser.entity(item.description ?? item.name ?? "")}
        </p>
    );
}
