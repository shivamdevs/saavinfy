"use client";

import React from "react";

export default function LogoutPage({ continuePath }: { continuePath: string }) {
    React.useEffect(() => {
        window.location.replace(continuePath);
    }, [continuePath]);

    return null;
}
