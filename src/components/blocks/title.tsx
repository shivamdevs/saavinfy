import Parser from "@/helpers/parser";
import { cn } from "@/lib/utils";
import { MediaItem } from "@/types/media";
import React from "react";

export type BlockTitleProps = Omit<
    React.HTMLAttributes<HTMLParagraphElement> & {
        item: MediaItem;
    },
    "children"
>;
export default function BlockTitle({
    item,
    className,
    ...props
}: BlockTitleProps) {
    return (
        <p
            className={cn("text-xl font-semibold line-clamp-1", className)}
            {...props}
        >
            {Parser.entity(item.title ?? item.name ?? "")}
        </p>
    );
}
