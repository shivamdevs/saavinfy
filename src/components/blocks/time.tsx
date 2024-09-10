import { cn, formatSeconds } from "@/lib/utils";
import React from "react";

export type BlockTimeProps = React.HTMLAttributes<HTMLSpanElement> & {
    time: number;
};
export default function BlockTime({
    className,
    time,
    ...props
}: BlockTimeProps) {
    return (
        <span className={cn("text-sm", className)} {...props}>
            {formatSeconds(time)}
        </span>
    );
}
