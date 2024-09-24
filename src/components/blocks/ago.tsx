"use client";

import useAgo from "@/contexts/hooks/use-ago";
import React from "react";

export type BackgroundCoverProps = React.HTMLAttributes<HTMLDivElement> & {
    time: Date | string | number;
};

export default function BlockAgo({ time, ...props }: BackgroundCoverProps) {
    const ago = useAgo();

    return <span {...props}>{ago(new Date(time).getTime())}</span>;
}
