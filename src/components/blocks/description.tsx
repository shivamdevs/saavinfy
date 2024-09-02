import Parser from "@/helpers/parser";
import { cn } from "@/lib/utils";
import { MediaItem } from "@/types/media";
import React from "react";

export type BlockDescriptionProps = Omit<
    React.HTMLAttributes<HTMLParagraphElement> & {
        item: MediaItem;
    },
    "children"
>;
export default function BlockDescription({
    item,
    className,
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
            {Parser.entity(item.description ?? item.name ?? "")}
        </p>
    );
}
