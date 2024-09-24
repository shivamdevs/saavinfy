"use client";

import React, { useEffect } from "react";
import StackContext, { ContextType, useHook as useStack } from "./context";
import useStackOps from "./operations";

export default useStack;

export type StackProviderProps = React.PropsWithChildren<{}>;

export function StackProvider({ children }: StackProviderProps) {
    // TODO: This is a hack to expose the library operations to the window object
    // TODO: so that it can be used in the browser console. This is useful for debugging
    // TODO: and
    // TODO: testing. This should be removed in production.
    const operations = useStackOps();

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        (window as unknown as { stack: ContextType }).stack = operations;
    }, [operations]);

    return (
        <StackContext.Provider value={operations}>
            {children}
        </StackContext.Provider>
    );
}

export type StackContextType = ContextType;

export { StackContext, useStack };
