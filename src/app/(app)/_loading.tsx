import Lucide from "@/components/lucide";
import Image from "next/image";
import React from "react";

export default function Loading() {
    return (
        <div className="fixed inset-0 flex-center flex-col gap-10 bg-background z-50">
            <Image
                src="/meta/icon.png"
                alt="Loading"
                width={100}
                height={100}
                priority
            />
            <Lucide.LoaderCircle
                size={32}
                className="animate-spin text-primary"
            />
        </div>
    );
}
