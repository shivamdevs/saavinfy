import React from "react";

import Tab from "../_components/tab";

export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <>
            <div className="flex items-center sticky top-0 z-30 bg-background p-4 gap-2">
                <Tab name="Top results" path="" />
                <Tab name="Songs" path="/songs" />
                <Tab name="Albums" path="/albums" />
                <Tab name="Artists" path="/artists" />
                <Tab name="Playlists" path="/playlists" />
            </div>
            {children}
        </>
    );
}
