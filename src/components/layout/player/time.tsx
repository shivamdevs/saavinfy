"use client";

import { TimeSpan } from "@/components/tokens/typography";
import { usePlayerTiming } from "@/contexts/player/hooks";
import React from "react";

export default function PlayerTime() {
    const [current, duration] = usePlayerTiming();

    return (
        <div className="inline-flex gap-1">
            <TimeSpan time={current} className="text-sm" />
            <span className="text-sm text-primary">/</span>
            <TimeSpan time={duration} className="text-sm" />
        </div>
    );
}
