import Skeleton from "@/components/blocks/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="absolute inset-0 pt-[4.25rem] m-4">
            <div className="flex flex-col mt-10 gap-0">
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
