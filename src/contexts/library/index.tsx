"use client";

import React, { useEffect } from "react";
import LibraryContext, { ContextType, useHook as useLibrary } from "./context";
import useLibraryOps from "./operations";
import { LibraryData } from "@/types/saves";
import useLibraryHistory from "./hooks/use-history";

export default useLibrary;

export type LibraryProviderProps = React.PropsWithChildren<{
    data: LibraryData;
}>;

export function LibraryProvider({ children, data }: LibraryProviderProps) {
    // TODO: This is a hack to expose the library operations to the window object
    // TODO: so that it can be used in the browser console. This is useful for debugging
    // TODO: and
    // TODO: testing. This should be removed in production.
    const operations = useLibraryOps(data);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        (window as unknown as { library: ContextType }).library = operations;
    }, [operations]);

    return (
        <LibraryContext.Provider value={operations}>
            <Hooker />
            {children}
        </LibraryContext.Provider>
    );
}

export { LibraryContext, useLibrary };

function Hooker() {
    useLibraryHistory();

    return null;
}
