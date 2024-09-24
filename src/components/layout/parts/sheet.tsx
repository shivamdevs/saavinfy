import React from "react";
import PartNav from "./sub/nav";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Lucide from "@/components/lucide";
import PartPlaylist from "./sub/playlist";
import { Button } from "@/components/ui/button";

export default function PartSheet() {
    return (
        <aside className="flex-1 max-w-96 h-full">
            <nav className="layout-col space-y-2 p-4">
                <PartNav href="/" title="Home" icon="house" />
                <PartNav
                    href="/search"
                    title="Search"
                    icon="search"
                    match="/search"
                    focusOnSearch
                />
            </nav>
            <div className="px-4">
                <Separator />
            </div>
            <div className="flex gap-5 items-center px-8 py-4">
                <Lucide.Library size={28} className="text-primary" />
                <p className="text-lg font-semibold text-secondary-foreground">
                    Your Library
                </p>
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto rounded-full"
                >
                    <Lucide.Plus size={20} />
                </Button>
            </div>
            <ScrollArea
                className={cn(
                    "h-[calc(100vh-5rem-1px-7.5rem-1px-4rem)]",
                    "player:h-[calc(100vh-5rem-1px-7.5rem-1px-4rem-5rem)]",
                    "pb-4"
                )}
            >
                <div className="px-4">
                    <PartPlaylist />
                </div>
            </ScrollArea>
        </aside>
    );
}
