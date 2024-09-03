"use client";

import React, { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ListProps {
    className?: string;
    children: React.ReactNode;
    initial?: boolean;
    mode?: "wait" | "sync" | "popLayout";
}

export const List = React.memo(
    ({ className, children, initial = false, mode }: ListProps) => {
        const childrenArray = React.Children.toArray(children);

        return (
            <div className={cn(`flex flex-col items-center gap-4`, className)}>
                <AnimatePresence initial={initial} mode={mode}>
                    {childrenArray.map((item) => (
                        <ListItem key={(item as ReactElement).key}>
                            {item}
                        </ListItem>
                    ))}
                </AnimatePresence>
            </div>
        );
    }
);

List.displayName = "AnimatedList";

export function ListItem({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    const animations = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1, originY: 0 },
        exit: { scale: 0, opacity: 0 },
        transition: { type: "spring", stiffness: 1024 * 4, damping: 128 },
    };

    return (
        <motion.div
            {...animations}
            layout
            className={cn("mx-auto w-full", className)}
        >
            {children}
        </motion.div>
    );
}
