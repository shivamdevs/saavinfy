"use client";

import React from "react";
import LucideLibrary from "@/components/lucide/library";
import { Heading, Text } from "@/components/tokens/typography";
import { cn, formatDateAndTime, formatPlural } from "@/lib/utils";
import Image from "next/image";
import Entity from "@/components/tokens/entity";
import Link from "next/link";

import useLibrary from "@/contexts/library";

export default function FavoritesAndPlaylists() {
    const library = useLibrary();

    return (
        <section className="layout-card flex-1 layout-col">
            <header className="p-4 flex items-center gap-4">
                <LucideLibrary size={32} />
                <Heading
                    level={2}
                    className="text-lg font-semibold text-secondary-foreground flex-1"
                >
                    Your Library
                </Heading>
            </header>
            <div className="relative flex-1">
                <div className="absolute inset-0 overflow-auto p-2">
                    <Tab
                        name="Favorites"
                        id=""
                        image="/images/favorites.png"
                        count={library.favorites.songs.length}
                        date={library.favorites.date}
                    />
                </div>
            </div>
        </section>
    );
}

export type TabProps = {
    id: string;
    count: number;
    name: string;
    date: number;
    image: string;
};
function Tab({ id, name, count, image, date }: TabProps) {
    return (
        <div
            className={cn(
                "flex items-center p-2 relative",
                "hover:bg-accent focus-within:bg-accent rounded-md",
                "transition-all group gap-4"
            )}
        >
            <div className="w-10 h-10 rounded-lg flex-center">
                <Image
                    src={image}
                    alt={name}
                    width={40}
                    height={40}
                    className="rounded-lg"
                />
            </div>
            <div className="flex flex-col">
                <Text className="font-semibold line-clamp-1">
                    <Entity html={name} />
                </Text>
                <Text className="text-sm text-secondary-foreground line-clamp-1">
                    {count} {formatPlural(count, "song")} •{" "}
                    {formatDateAndTime(date)}
                </Text>
            </div>
            <Link href={`/library/${id}`} className="absolute inset-0" />
        </div>
    );
}
