import Image from "next/image";
import React from "react";
import History from "./_components/history";

export default function Page() {
    return (
        <div className="flex-center flex-col w-full gap-16 pt-[10vh]">
            <h2 className="text-2xl font-bold">
                Start searching for your favorite songs!
            </h2>
            <Image
                src="/images/search.svg"
                alt="Search"
                width={480}
                height={480}
            />
            <History />
        </div>
    );
}
