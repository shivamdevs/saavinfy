"use client";

import React from "react";
import LibraryContext, { useHook as useLibrary } from "./context";
import useLibraryOps from "./operations";
import { LibraryCache } from "@/types/library";

export default useLibrary;

export type LibraryProviderProps = React.PropsWithChildren<{
    data: LibraryCache;
}>;

export function LibraryProvider({ children, data }: LibraryProviderProps) {
    const operations = useLibraryOps(data);

    return (
        <LibraryContext.Provider value={operations}>
            {children}
        </LibraryContext.Provider>
    );
}

export { LibraryContext, useLibrary };
