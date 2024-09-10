import Skeleton from "@/components/blocks/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="absolute inset-0 pt-10 m-4">
            <Skeleton className="w-1/5 h-7 rounded-sm mb-2 mt-1" />
            <div className="flex flex-wrap my-5">
                {new Array(3 * 10).fill(null).map((_, i) => (
                    <div className="w-40 p-4" key={i}>
                        <Skeleton className="size-[136px]" />
                        <Skeleton className="w-4/5 h-5" />
                        <Skeleton className="w-4/5 h-5" />
                        <Skeleton className="w-3/4 h-4 mt-1" />
                    </div>
                ))}
            </div>
        </div>
    );
}
