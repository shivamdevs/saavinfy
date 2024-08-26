"use client";

import React from "react";
import useLibrary from "@/contexts/library";
import LucideLibrary from "@/components/lucide/library";
import { Heading } from "@/components/tokens/typography";

export default function FavoritesAndPlaylists() {
    const library = useLibrary();

    return (
        <section className="layout-card flex-1">
            <header className="p-4 flex items-center gap-4">
                <LucideLibrary size={32} />
                <Heading
                    level={2}
                    className="text-lg font-semibold text-secondary-foreground flex-1"
                >
                    Your Library
                </Heading>
            </header>
        </section>
    );
}
