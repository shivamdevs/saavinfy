import { Metadata } from "next";

export const Meta: Metadata = {
    applicationName: "Saavinfy",
    title: "Saavinfy - Listen to your heart content",
    description:
        "Listen music to your heart content. Saavinfy is a music streaming platform that allows you to listen to your favorite music.",
    icons: [
        {
            rel: "icon",
            type: "image/icon",
            sizes: "16x16",
            url: "/favicon.ico",
        },
        {
            rel: "icon",
            type: "image/icon",
            sizes: "32x32",
            url: "/favicon.ico",
        },
        {
            type: "image/png",
            sizes: "192x192",
            url: "/meta/android-chrome-192x192.png",
        },
        {
            type: "image/png",
            sizes: "512x512",
            url: "/meta/android-chrome-512x512.png",
        },
        {
            rel: "apple-touch-icon",
            sizes: "180x180",
            url: "/meta/apple-touch-icon.png",
        },
    ],
};
