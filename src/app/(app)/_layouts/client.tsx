"use client";

import React, { useEffect } from "react";
import { SWRConfig } from "swr";

import Saavn from "@/helpers/saavn";
import useFetchAndPlay from "@/contexts/hooks/use-play";

export default function ClientLayout({ children }: React.PropsWithChildren) {
    // TODO: This is a hack to expose the fetchPlay function to the window object
    // TODO: so that it can be used in the browser console. This is useful for debugging
    // TODO: and
    // TODO: testing. This should be removed in production.
    const fetchPlay = useFetchAndPlay();

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        (window as unknown as { fetchPlay: typeof fetchPlay }).fetchPlay =
            fetchPlay;
    }, [fetchPlay]);

    return (
        <SWRConfig
            value={{
                fetcher<T>(slug: string) {
                    return Saavn.get<T>(slug);
                },
            }}
        >
            {children}
        </SWRConfig>
    );
}
