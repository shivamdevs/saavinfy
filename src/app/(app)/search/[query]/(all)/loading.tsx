import Skeleton from "@/components/blocks/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="absolute inset-0 pt-[4.25rem] m-4">
            <div className="flex flex-row gap-10 mt-10">
                <div className="flex-1">
                    <Skeleton className="h-8 w-40 ml-3" />
                </div>
                <div className="flex-[2]">
                    <Skeleton className="h-8 w-24 ml-3" />
                </div>
            </div>
            <div className="flex flex-row gap-10 mt-4">
                <div className="flex-1 h-64 relative">
                    <Skeleton className="top-4 left-5 absolute size-[121px] mt-1" />
                    <Skeleton className="top-40 -mt-1 left-5 absolute h-8 w-4/5 rounded-sm" />
                    <Skeleton className="top-52 mt-1.5 left-5 absolute h-4 w-4/5 rounded-sm" />
                </div>
                <div className="flex flex-[2] gap-2 relative">
                    <div className="relative w-16 px-2 py-1 flex flex-col gap-4">
                        <Skeleton className="size-[48px]" />
                        <Skeleton className="size-[48px]" />
                        <Skeleton className="size-[48px]" />
                    </div>
                    <div className="flex-1 relative flex flex-col pt-2">
                        <Skeleton className="h-5 w-3/4 rounded-sm" />
                        <Skeleton className="h-4 w-3/5 mt-1 mb-6 rounded-sm" />
                        <Skeleton className="h-5 w-3/4 rounded-sm" />
                        <Skeleton className="h-4 w-3/5 mt-1 mb-6 rounded-sm" />
                        <Skeleton className="h-5 w-3/4 rounded-sm" />
                        <Skeleton className="h-4 w-3/5 mt-1 mb-6 rounded-sm" />
                    </div>
                    <div className="flex-1 relative flex flex-col pt-4">
                        <Skeleton className="h-4 w-3/5 mb-12 rounded-sm" />
                        <Skeleton className="h-4 w-3/5 mt-1.5 mb-12 rounded-sm" />
                        <Skeleton className="h-4 w-3/5 mb-12 rounded-sm" />
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-8 mt-24 pt-2.5 pl-4">
                <div className="w-48">
                    <Skeleton className="size-48" />
                    <Skeleton className="w-4/5 h-5 mt-1.5" />
                    <Skeleton className="w-3/4 h-4 mt-2" />
                </div>
                <div className="w-48">
                    <Skeleton className="size-48" />
                    <Skeleton className="w-4/5 h-5 mt-1.5" />
                    <Skeleton className="w-3/4 h-4 mt-2" />
                </div>
                <div className="w-48">
                    <Skeleton className="size-48" />
                    <Skeleton className="w-4/5 h-5 mt-1.5" />
                    <Skeleton className="w-3/4 h-4 mt-2" />
                </div>
            </div>
            <div className="flex flex-row gap-8 mt-32 pt-2 pl-4">
                <div className="w-48">
                    <Skeleton className="size-48" />
                    <Skeleton className="w-4/5 h-5 mt-1.5" />
                    <Skeleton className="w-3/4 h-4 mt-2" />
                </div>
                <div className="w-48">
                    <Skeleton className="size-48" />
                    <Skeleton className="w-4/5 h-5 mt-1.5" />
                    <Skeleton className="w-3/4 h-4 mt-2" />
                </div>
                <div className="w-48">
                    <Skeleton className="size-48" />
                    <Skeleton className="w-4/5 h-5 mt-1.5" />
                    <Skeleton className="w-3/4 h-4 mt-2" />
                </div>
            </div>
        </div>
    );
}
