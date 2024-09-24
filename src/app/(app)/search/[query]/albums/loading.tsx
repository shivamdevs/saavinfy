import Skeleton from "@/components/blocks/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="absolute inset-0 pt-[4.25rem] m-4">
            <div className="flex flex-wrap my-10">
                {new Array(3 * 10).fill(null).map((_, i) => (
                    <div className="w-56 p-4" key={i}>
                        <Skeleton className="size-48" />
                        <Skeleton className="w-4/5 h-5 mt-1.5" />
                        <Skeleton className="w-3/4 h-4 mt-2" />
                    </div>
                ))}
            </div>
        </div>
    );
}
