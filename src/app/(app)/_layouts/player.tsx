"use client";

import React from "react";

import usePlayer from "@/contexts/player";
import { cn } from "@/lib/utils";

export default function PlayerLayout({ children }: React.PropsWithChildren) {
    const player = usePlayer();

    return (
        <section
            className={cn({
                "has-player": player.queue.length > 0,
            })}
        >
            {children}
        </section>
    );
}
