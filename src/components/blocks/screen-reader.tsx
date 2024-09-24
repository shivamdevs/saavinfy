import { Media } from "@/types/media";
import { SearchResultType } from "@/types/search";
import React from "react";

export type ScreenReaderProps = {
    play?: SearchResultType | Media;
    view?: SearchResultType | Media;
};

export default function ScreenReader({ play, view }: ScreenReaderProps) {
    const item = play || view;

    if (!item) {
        return null;
    }

    return (
        <span className="sr-only">
            {play ? "Play" : view ? "View" : "Listen"} {item.type} -{" "}
            {item?.title || item?.name}
        </span>
    );
}
