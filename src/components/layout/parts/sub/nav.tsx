"use client";

import Lucide from "@/components/lucide";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Icons = {
    house: Lucide.House,
    search: Lucide.Search,
};

export type PartNavProps = {
    icon: keyof typeof Icons;
    href: string;
    title: string;
    match?: RegExp | string;
    focusOnSearch?: boolean;
};

export default function PartNav({
    href,
    icon,
    focusOnSearch,
    match,
    title,
}: PartNavProps) {
    const pathname = usePathname();

    const Icon = Icons[icon];

    return (
        <Button
            asChild
            variant={
                pathname === href || (match && new RegExp(match).test(pathname))
                    ? "secondary"
                    : "link"
            }
            className="justify-start gap-5 py-5 text-white"
        >
            <Link
                href={href}
                onClick={() => {
                    if (focusOnSearch) {
                        setTimeout(() => {
                            const input =
                                document.querySelector("input[type=search]");
                            if (input) {
                                (input as HTMLInputElement).focus();
                            }
                        }, 1);
                    }
                }}
            >
                <Icon size={18} />
                {title}
            </Link>
        </Button>
    );
}
