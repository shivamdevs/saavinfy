"use client";

import Lucide from "@/components/lucide";
import { Button } from "@/components/ui/button";
import { usePlayerOptions } from "@/contexts/player/hooks";
import useStack from "@/contexts/stack";
import { cn } from "@/lib/utils";
import React from "react";
import { useUpdateEffect } from "react-unique-hooks";

export default function PartStackView() {
    const { stack } = useStack();
    const options = usePlayerOptions();

    const [ping, setPing] = React.useState(false);

    useUpdateEffect(() => {
        setPing(true);
    }, [stack]);

    useUpdateEffect(() => {
        if (options.panels.is("notifications")) {
            setPing(false);
        }
    }, [options]);

    return (
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full relative"
            onClick={() => {
                options.panels.toggle("notifications");
            }}
        >
            {ping && (
                <span className="absolute top-0 right-0 pointer-events-none">
                    <span className="animate-ping absolute -left-1.5 inline-flex size-5 rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full size-2 bg-primary" />
                </span>
            )}
            <Lucide.Bell
                className={cn(
                    "text-secondary-foreground duration-500",
                    options.panels.is("notifications") && "text-primary"
                )}
            />
        </Button>
    );
}
