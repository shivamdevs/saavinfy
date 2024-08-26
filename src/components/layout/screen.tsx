import { cn } from "@/lib/utils";
import React from "react";

function ScreenOffset({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("-mt-80 relative z-[1] min-h-96 bg-", className)}
            style={{
                // linear gradient to bottom from card/20(0px) to card(80px) to card(100%)
                backgroundImage:
                    "linear-gradient(to bottom, hsl(var(--card) / 0.2) 0%, hsl(var(--card)) 10rem, hsl(var(--card)) 100%)",
            }}
            {...props}
        />
    );
}

export default ScreenOffset;
