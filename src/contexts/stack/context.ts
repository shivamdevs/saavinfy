import { StackAddOptions, StackItem } from "@/types/stack";
import React from "react";
import Stack from "./stack";

export type ContextAddStack = (
    // eslint-disable-next-line no-unused-vars
    key: string,
    // eslint-disable-next-line no-unused-vars
    message: string,
    // eslint-disable-next-line no-unused-vars
    options?: StackAddOptions
) => Stack;

export type ContextType = {
    stack: StackItem[];
    setStack: React.Dispatch<React.SetStateAction<StackItem[]>>;

    add: ContextAddStack;
    new: ContextAddStack;
    create: ContextAddStack;

    addStack: ContextAddStack;
    newStack: ContextAddStack;
    createStack: ContextAddStack;
};

export const contextDefaultValue: ContextType = {
    stack: [],
    setStack: () => [],

    add: () => new Stack("", [], () => []),
    new: () => new Stack("", [], () => []),
    create: () => new Stack("", [], () => []),

    addStack: () => new Stack("", [], () => []),
    newStack: () => new Stack("", [], () => []),
    createStack: () => new Stack("", [], () => []),
};

export const ContextElement =
    React.createContext<ContextType>(contextDefaultValue);

ContextElement.displayName = "Action Stack";

export function useHook(): ContextType {
    const context = React.useContext(ContextElement);

    if (!context)
        throw new Error(
            `Unable to access ${ContextElement.displayName} Context API.`
        );

    return context;
}

export default ContextElement;
