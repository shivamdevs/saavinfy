import { cn } from "@/lib/utils";
import React from "react";

export type PalettesBoxProps = React.HTMLAttributes<HTMLDivElement>;
export default function PalettesBox({
    className,
    children,
    ...props
}: PalettesBoxProps) {
    return (
        <section className={cn("w-full flex-1 relative")} {...props}>
            <div className={cn("absolute inset-0 overflow-auto", className)}>
                {children}
            </div>
        </section>
    );
}
