import React from "react";
import { StackAddOptions, StackItem } from "@/types/stack";
import { uuid } from "@/lib/utils";
import Stack from "./stack";
import { ContextType } from "./context";

function useOps(): ContextType {
    const [stack, setStack] = React.useState<StackItem[]>([]);

    React.useLayoutEffect(() => {
        // eslint-disable-next-line no-console
        console.log("Stack updated", stack);
    }, [stack]);

    const addToStack = React.useCallback(
        (key: string, message: string, options?: StackAddOptions) => {
            const { mergeWithPrevious, ...rest } = options ?? {};

            const item: StackItem = {
                id: uuid(),
                key,
                message,
                type: "info",
                time: Date.now(),
                history: [],
                progress: 0,
                count: 0,
                details: null,
                ...rest,
            };

            setStack((prev) => {
                const dup = [...prev];
                if (mergeWithPrevious) {
                    const last = dup.at(0);
                    if (last && last.key === key) {
                        item.history.push(last, ...last.history);

                        last.history = [];

                        item.history = item.history
                            .filter(
                                (n, i, a) =>
                                    a.findIndex((t) => t.id === n.id) === i
                            )
                            .sort((a, b) => b.time - a.time);
                        dup.shift();
                    }
                }

                dup.push(item);

                return dup.sort((a, b) => b.time - a.time);
            });

            return new Stack(item.id, stack, setStack);
        },
        [stack]
    );

    // const updateStack = React.useCallback(
    //     (id: string, item: StackUpdateOptions) => {
    //         if (Object.keys(item).length === 0) {
    //             return id;
    //         }

    //         setStack((prev) => {
    //             const dup = [...prev];
    //             const index = dup.findIndex((i) => i.id === id);

    //             if (index === -1) {
    //                 return dup;
    //             }

    //             dup[index] = { ...dup[index], ...item, time: Date.now() };

    //             return dup;
    //         });
    //     },
    //     []
    // );

    return {
        stack,
        setStack,

        add: addToStack,
        new: addToStack,
        create: addToStack,

        addStack: addToStack,
        newStack: addToStack,
        createStack: addToStack,
    };
}

export default useOps;
