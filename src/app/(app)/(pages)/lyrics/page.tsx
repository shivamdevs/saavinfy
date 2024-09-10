import Image from "next/image";
import React from "react";
import LyricsSwap from "./_swap";

export default function Page() {
    return (
        <div className="flex-center pt-20 flex-col gap-10">
            <h2 className="text-2xl font-bold text-center">
                Opps! Looks like you can&apos;t sing this song yet!
            </h2>
            <Image
                src="/images/mic-drop.svg"
                width={320}
                height={320}
                alt="Mic Drop"
            />
            <LyricsSwap />
        </div>
    );
}
