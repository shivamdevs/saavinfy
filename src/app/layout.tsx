import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Meta } from "@/config/meta";
import { cn } from "@/lib/utils";
import Fonts from "@/fonts";

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
            <body className={cn(Fonts.text.className, "dark")}>
                {children}
                <div id="portal"></div>
            </body>
        </html>
    );
}
