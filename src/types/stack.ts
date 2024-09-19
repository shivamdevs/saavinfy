export type StackItem = {
    id: string;
    key: string;
    type: StackType;
    message: string;
    details: string | null;
    time: number;
    history: StackItem[];

    progress: number;
    count: number;
};

export type StackType = "info" | "warning" | "error" | "success" | "loading";

// partial StackItem and Omit id, history, time & add mergeWithPrevious?: boolean;
export type StackAddOptions = Omit<
    Partial<StackItem>,
    "id" | "history" | "time" | "key" | "message"
> & {
    mergeWithPrevious?: boolean;
};

export type StackUpdateOptions = Omit<
    Partial<StackItem>,
    "id" | "history" | "time" | "key"
>;
