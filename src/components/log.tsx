"use client";

import React from "react";

export default function Log({ log }: { log: unknown }) {
    React.useEffect(() => {
        console.log(log);
    }, [log]);

    return null;
}
