"use client";

import Parser from "@/helpers/parser";
import React from "react";
import { useInterval } from "react-unique-hooks";

export default function useAgo() {
    const [timeStamp, setTimeStamp] = React.useState<number>(Date.now());

    const callback = React.useCallback(
        (time: number) => {
            return Parser.moment(time);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [timeStamp]
    );

    useInterval(() => {
        setTimeStamp(Date.now());
    }, 1000);

    return callback;
}
