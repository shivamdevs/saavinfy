"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Prefetch(href: string) {
    const router = useRouter();

    React.useEffect(() => {
        router.prefetch(href);
    }, [href, router]);

    return null;
}
