import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export type OverlayContentProps = React.PropsWithChildren;
export default function OverlayContent({ children }: OverlayContentProps) {
    return (
        <ScrollArea
            className={cn(
                "h-[calc(100vh-5rem-2px-3.25rem)]",
                "player:h-[calc(100vh-5rem-2px-3.25rem-5rem)]"
            )}
        >
            {children}
        </ScrollArea>
    );
}
