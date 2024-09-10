import Skeleton from "@/components/blocks/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="absolute inset-0">
            <div className="flex items-end p-5 gap-5">
                <Skeleton className="size-[240px]" />
                <div className="flex flex-col flex-1 gap-7">
                    <Skeleton className="w-1/5 h-4 -mb-0.5 rounded-sm" />
                    <Skeleton className="w-2/4 h-10 rounded-sm" />
                    <Skeleton className="w-2/5 h-4 mb-1 rounded-sm" />
                </div>
            </div>
            <div className="p-5">
                <div className="flex items-center gap-4 mb-14 pb-1">
                    <Skeleton className="size-14 rounded-full" />
                    <Skeleton className="size-14 rounded-full" />
                    <Skeleton className="ml-auto h-5 w-20 rounded-sm mr-2 mt-4" />
                    <Skeleton className="h-5 w-20 rounded-sm mr-2.5 mt-4" />
                </div>
                <div className="my-10">
                    <Skeleton className="w-1/6 h-6 rounded-sm mt-1 mb-2" />
                    {new Array(30).fill(null).map((_, i) => (
                        <div
                            className="flex gap-4 p-2 h-16 items-center"
                            key={i}
                        >
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
        </div>
    );
}
