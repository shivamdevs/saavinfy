"use client";

import BlockTime from "@/components/blocks/time";
import { usePlayerTiming } from "@/contexts/player/hooks";
import React from "react";

export default function PlayerTime() {
    const [current, duration] = usePlayerTiming();

    return (
        <div className="inline-flex gap-1 font-mono">
            <BlockTime time={current} className="text-sm" />
            <span className="text-sm text-primary">/</span>
            <BlockTime time={duration} className="text-sm" />
        </div>
    );
}
