import { StackItem, StackType, StackUpdateOptions } from "@/types/stack";
import React from "react";

export default class Stack {
    id: string;
    stack: StackItem[];
    setStack: React.Dispatch<React.SetStateAction<StackItem[]>>;

    constructor(
        id: string,
        stack: StackItem[],
        setStack: React.Dispatch<React.SetStateAction<StackItem[]>>
    ) {
        this.id = id;
        this.stack = stack;
        this.setStack = setStack;
    }

    get() {
        return this.stack.find((i) => i.id === this.id);
    }

    update(item: StackUpdateOptions) {
        if (Object.keys(item).length === 0) {
            return this;
        }

        for (let key in item) {
            if (item[key as keyof StackUpdateOptions] === undefined) {
                delete item[key as keyof StackUpdateOptions];
            }
        }

        this.setStack((prev) => {
            const dup = [...prev];
            const index = dup.findIndex((i) => i.id === this.id);

            if (index === -1) {
                return dup;
            }

            dup[index] = { ...dup[index], ...item, time: Date.now() };

            return dup;
        });

        return this;
    }

    success(message: string, options?: StackUpdateOptions) {
        return this.update({
            message,
            type: "success",
            ...(options ?? {}),
        });
    }

    info(message: string, options?: StackUpdateOptions) {
        return this.update({
            message,
            type: "info",
            ...(options ?? {}),
        });
    }

    warning(message: string, options?: StackUpdateOptions) {
        return this.update({
            message,
            type: "warning",
            ...(options ?? {}),
        });
    }

    error(message: string, details?: string, options?: StackUpdateOptions) {
        return this.update({
            message,
            details,
            type: "error",
            ...(options ?? {}),
        });
    }

    loading(message: string, options?: StackUpdateOptions) {
        return this.update({
            message,
            type: "loading",
            ...(options ?? {}),
        });
    }

    message(message: string, details?: string) {
        return this.update({
            message,
            details,
        });
    }

    details(details: string) {
        return this.update({
            details,
        });
    }

    type(type: StackType) {
        return this.update({
            type,
        });
    }

    progress(progress: number, count?: number) {
        return this.update({
            progress,
            count,
        });
    }

    total(count: number) {
        return this.update({
            count,
        });
    }

    remove() {
        this.setStack((prev) => prev.filter((i) => i.id !== this.id));
    }
}
