import React from "react";
import AppLayout from "@/components/layout";
import ClientLayout from "./client";
import ServerLayout from "./server";

function Layout({ children }: React.PropsWithChildren) {
    return (
        <ServerLayout>
            <AppLayout>
                <ClientLayout>{children}</ClientLayout>
            </AppLayout>
        </ServerLayout>
    );
}

export default Layout;
