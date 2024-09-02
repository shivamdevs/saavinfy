import React from "react";
import Fonts from "@/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import PartSearch from "./sub/search";

export default function PartHeader() {
    return (
        <header className="flex items-center px-5 bg-primary-background h-20">
            <div className="flex-1 max-w-[23rem]">
                <Link href="/" className="flex gap-4 items-center">
                    <Image
                        src="/meta/icon.png"
                        alt="icon"
                        width={40}
                        height={40}
                    />
                    <span className={cn(Fonts.brand.className, "text-3xl")}>
                        Saavinfy
                    </span>
                </Link>
            </div>
            <PartSearch />
            <div className="mx-auto"></div>
        </header>
    );
}
