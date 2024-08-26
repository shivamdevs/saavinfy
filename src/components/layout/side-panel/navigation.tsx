"use client";

import React from "react";
import Fonts from "@/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideElement } from "@/components/lucide/.lucide";
import { LinkProps } from "@/types/link";
import LucideHouse from "@/components/lucide/house";
import LucideSearch from "@/components/lucide/search";

function SidePanelNavigation() {
    return (
        <section className="layout-card">
            <header className="p-4 flex gap-4 items-center">
                <Image src="/meta/icon.png" alt="icon" width={48} height={48} />
                <h1 className={cn(Fonts.brand.className, "text-4xl")}>
                    Saavinfy
                </h1>
            </header>
            <Item href="/" icon={LucideHouse}>
                Home
            </Item>
            <Item href="/search" icon={LucideSearch}>
                Search
            </Item>
        </section>
    );
}

export default SidePanelNavigation;

type ItemProps = LinkProps & {
    icon: LucideElement;
    children: React.ReactNode;
};

function Item({ icon, className, children, ...props }: ItemProps) {
    const Icon = icon;

    const pathname = usePathname();

    return (
        <Link
            {...props}
            className={cn(
                "p-4 flex gap-4 items-center",
                {
                    "bg-accent":
                        props.href === pathname ||
                        // props.href.includes(pathname) ||
                        (props.href !== "/" && pathname.includes(props.href)),
                },
                className
            )}
        >
            <Icon size={24} />
            {children}
        </Link>
    );
}
