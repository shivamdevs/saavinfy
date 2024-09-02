import React from "react";
import PartHeader from "./parts/header";
import PartSheet from "./parts/sheet";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import Player from "./player";
import Overlays from "./overlays";

export type AppLayoutProps = React.PropsWithChildren;

function AppLayout({ children }: AppLayoutProps) {
    return (
        <section className="fixed inset-0 layout-col overflow-auto">
            <PartHeader />
            <Separator />
            <section className="flex-1 layout-row h-[calc(100vh-5rem-1px)]">
                <PartSheet />
                <Separator orientation="vertical" />
                <ScrollArea
                    className={cn(
                        "h-[calc(100vh-5rem-1px)] flex-1 w-full",
                        "player:h-[calc(100vh-5rem-1px-5rem)]"
                    )}
                >
                    <main className="p-4">{children}</main>
                </ScrollArea>
                <Overlays />
            </section>
            <Player />
        </section>
    );
}

export default AppLayout;
