import Skeleton from "@/components/blocks/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="absolute inset-0 pt-10 m-4">
            <Skeleton className="w-1/5 h-7 rounded-sm mb-2 mt-1" />
            <div className="flex flex-wrap my-2 pl-1">
                {new Array(10).fill(null).map((_, i) => (
                    <div className="w-56 p-4 pb-2" key={i}>
                        <Skeleton className="size-48" />
                        <Skeleton className="w-4/5 h-5 mt-1.5" />
                        <Skeleton className="w-3/4 h-4 mt-2" />
                        <Skeleton className="w-3/5 h-4 -mt-1" />
                    </div>
                ))}
            </div>
            <Skeleton className="w-1/5 h-7 rounded-sm mb-2 mt-7" />
            <div className="flex flex-col mt-5 gap-0 pl-1">
                {new Array(30).fill(null).map((_, i) => (
                    <div className="flex gap-4 p-2 h-16 items-center" key={i}>
                        <Skeleton className="size-[48px]" />

                        <div className="flex-1 flex flex-col gap-2">
                            <Skeleton className="h-5 w-3/4 rounded-sm" />
                            <Skeleton className="h-4 w-3/5 rounded-sm" />
                        </div>
                        <Skeleton className="h-4 w-3/5 rounded-sm flex-1" />
                        <Skeleton className="h-4 w-12 rounded-sm" />
                        <Skeleton className="size-9 rounded-full" />
                        <Skeleton className="size-9 rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}
