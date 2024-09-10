"use client";

import React from "react";

export default function Log({
    log,
    logs,
}: {
    log?: unknown;
    logs?: unknown[];
}) {
    React.useEffect(() => {
        const l = logs || [];
        if (log) {
            l.unshift(log);
        }
        // eslint-disable-next-line no-console
        console.log(...l);
    }, [log, logs]);

    return null;
}
