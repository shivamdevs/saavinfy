"use client";

import Lucide from "@/components/lucide";
import React from "react";

function ErrorBoxRefresh() {
    return (
        <button
            className="mt-8 mx-auto inline-flex items-center gap-4 py-2 w-96 justify-center rounded-full bg-accent hover:bg-primary transition-all border border-primary/50"
            onClick={() => window.location.reload()}
        >
            Reload
            <Lucide.RefreshCw className="w-5 h-5" />
        </button>
    );
}

export default ErrorBoxRefresh;
