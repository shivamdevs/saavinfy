"use client";

import Lucide from "@/components/lucide";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Icons = {
    house: Lucide.House,
    search: Lucide.Search,
    library: Lucide.Library,
};

export type PartNavProps = {
    icon: keyof typeof Icons;
    href: string;
    title: string;
    match?: RegExp | string;
    focusOnSearch?: boolean;
    hidden?: boolean;
};

export default function PartNav({
    href,
    icon,
    focusOnSearch,
    match,
    title,
    hidden,
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
            className={cn(
                "justify-start sm:gap-5 gap-1 sm:py-2.5 py-0 text-white sm:flex-0 flex-1",
                {
                    "sm:hidden": hidden,
                }
            )}
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
                className={cn(
                    "sm:flex-row flex-col sm:h-9 h-auto sm:text-sm text-xs"
                )}
            >
                <Icon size={18} />
                {title}
            </Link>
        </Button>
    );
}
