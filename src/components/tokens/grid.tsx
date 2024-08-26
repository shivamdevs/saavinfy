import { cn } from "@/lib/utils";
import React from "react";
import { Heading } from "./typography";

export type ItemsGridProps = React.HTMLAttributes<HTMLDivElement> & {
    title: string;
};

function ItemsGrid({ className, title, ...props }: ItemsGridProps) {
    return (
        <div className={cn("my-4 flex flex-col gap-2")}>
            <Heading
                level={2}
                className={cn("text-2xl font-semibold capitalize")}
            >
                {title}
            </Heading>
            <div
                className={cn(
                    "grid grid-cols-[repeat(auto-fit,_minmax(160px,200px))]",
                    className
                )}
                {...props}
            />
        </div>
    );
}

export default ItemsGrid;
