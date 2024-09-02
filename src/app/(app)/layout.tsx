import React from "react";

import AppLayout from "@/components/layout";

import PlayerLayout from "./_layouts/player";
import ServerLayout from "./_layouts/server";
import ClientLayout from "./_layouts/client";

export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <ServerLayout>
            <PlayerLayout>
                <AppLayout>
                    <ClientLayout>{children}</ClientLayout>
                </AppLayout>
            </PlayerLayout>
        </ServerLayout>
    );
}
