import React from "react";
import type { Metadata } from "next";
import { Meta } from "@/config/meta";
import { cn } from "@/lib/utils";
import Fonts from "@/fonts";

import "./globals.css";

export const metadata: Metadata = {
    title: Meta.title,
    description: Meta.description,
    icons: Meta.icons,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    Fonts.text.className,
                    Fonts.text.variable,
                    Fonts.brand.variable,
                    Fonts.mono.variable,
                    "dark"
                )}
            >
                {children}
                <div id="portal"></div>
            </body>
        </html>
    );
}
