import { MediaLyrics } from "@/types/media";
import React from "react";
import LyricsSwap from "../_swap";

export default function LyricsPage({ lyrics }: { lyrics: MediaLyrics }) {
    return (
        <div className="p-4">
            {lyrics.lyrics.split("<br>").map((line, index) => (
                <p
                    key={index}
                    className="text-3xl text-center text-secondary-foreground my-3"
                >
                    {line}
                </p>
            ))}
            <p className="text-center text-primary mt-10 text-sm font-medium">
                {lyrics.copyright}
            </p>
            <LyricsSwap />
        </div>
    );
}
