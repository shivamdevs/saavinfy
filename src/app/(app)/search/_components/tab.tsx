"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Searcher from "@/helpers/searcher";

export default function Tab({ name, path }: { name: string; path: string }) {
    const params = useParams<{ query: string }>();
    const pathname = usePathname();

    const href = `/search/${Searcher.recode(params.query)}${path}`;

    const active =
        pathname === href || (path !== "" && pathname.includes(href));

    return (
        <Button
            asChild
            className="rounded-full px-6"
            variant={active ? "default" : "outline"}
        >
            <Link href={href}>{name}</Link>
        </Button>
    );
}
