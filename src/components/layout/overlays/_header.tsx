"use client";

import { usePlayerOptions } from "@/contexts/player/hooks";
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Lucide from "@/components/lucide";
import Tippy from "@/components/ui/tooltip";

export type OverlayHeaderProps = React.PropsWithChildren<{
    title: React.ReactNode;
}>;
export default function OverlayHeader({ children, title }: OverlayHeaderProps) {
    const options = usePlayerOptions();

    if (!options.panel) {
        return null;
    }

    return (
        <>
            <header className="w-full p-2 pl-4 gap-2 flex items-center h-[3.25rem]">
                <div className="flex-1 flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-secondary-foreground">
                        {title}
                    </h3>
                    {children}
                </div>
                <Tippy content="Close">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="justify-self-end rounded-full"
                        onClick={() => options.update({ panel: undefined })}
                    >
                        <Lucide.X size={16} />
                    </Button>
                </Tippy>
            </header>
            <div className="px-2">
                <Separator />
            </div>
        </>
    );
}
