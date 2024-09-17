"use client";

import React from "react";

import usePlayer from "@/contexts/player";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

export default function PlayerLayout({ children }: React.PropsWithChildren) {
    const player = usePlayer();

    return (
        <section
            className={cn({
                "has-player": player.queue.length > 0,
            })}
        >
            {children}
            <Toaster
                position="bottom-center"
                containerStyle={{
                    bottom: player.queue.length ? "6rem" : "1rem",
                    top: "6rem",
                    overflow: "hidden",
                }}
            />
        </section>
    );
}
