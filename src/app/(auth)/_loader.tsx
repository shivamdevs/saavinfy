"use client";

import React from "react";
import { useAuthStatus } from "./hooks";
import Lucide from "@/components/lucide";

export default function AuthLoader() {
    const status = useAuthStatus();

    if (status.pending) {
        return (
            <div className="fixed inset-0 bg-background/50 flex-center">
                <Lucide.LoaderCircle
                    size={32}
                    className="animate-spin text-primary"
                />
            </div>
        );
    }

    return null;
}
