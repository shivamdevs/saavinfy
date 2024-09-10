import React from "react";
import Fonts from "@/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function BlockBrand() {
    return (
        <Link href="/" className="flex gap-4 items-center">
            <Image src="/meta/icon.png" alt="icon" width={40} height={40} />
            <span className={cn(Fonts.brand.className, "text-3xl")}>
                Saavinfy
            </span>
        </Link>
    );
}
