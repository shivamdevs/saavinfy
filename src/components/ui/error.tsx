import React from "react";

export default function ErrorBox({ error }: { error?: string }) {
    if (!error) return null;

    return (
        <div
            className="bg-destructive/10 border border-destructive text-red-400 px-4 py-2 text-sm rounded-lg relative"
            role="alert"
        >
            <span className="block sm:inline">{error}</span>
        </div>
    );
}
