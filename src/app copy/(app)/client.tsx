"use client";

import { serverCall } from "@/lib/call";
import React from "react";
import { SWRConfig } from "swr";

function ClientLayout({ children }: React.PropsWithChildren) {
    return (
        <SWRConfig
            value={{
                fetcher<T>(slug: string) {
                    return serverCall<T>(slug);
                },
            }}
        >
            {children}
        </SWRConfig>
    );
}

export default ClientLayout;
