import { cn } from "@/lib/utils";
import React from "react";

export default function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <span
            className={cn(
                "inline-block animate-pulse bg-secondary/50 rounded-lg duration-1000",
                className
            )}
            {...props}
        />
    );
}
