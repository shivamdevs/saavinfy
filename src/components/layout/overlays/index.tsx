"use client";

import { Separator } from "@/components/ui/separator";
import { usePlayerOptions } from "@/contexts/player/hooks";
import React from "react";
import OverlayQueue from "./queue";
import OverlayStack from "./stack";
import OverlayInfo from "./info";

export default function Overlays() {
    const options = usePlayerOptions();

    if (!options.panel) {
        return null;
    }

    return (
        <>
            <Separator orientation="vertical" />
            <aside className="flex-1 max-w-96">
                {options.panels.is("queue") && <OverlayQueue />}
                {options.panels.is("notifications") && <OverlayStack />}
                {options.panels.is("info") && <OverlayInfo />}
            </aside>
        </>
    );
}
