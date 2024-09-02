"use server";

import React from "react";
import { cookies } from "next/headers";

import ErrorBox from "@/components/layout/error";

import { PlayerProvider } from "@/contexts/player";
import { LibraryProvider } from "@/contexts/library";

import Saves from "@/helpers/saves";
import Saavn from "@/helpers/saavn";

export default async function ServerLayout({
    children,
}: React.PropsWithChildren) {
    const playerSave = Saves.getPlayer(cookies);
    const librarySave = Saves.getLibrary(cookies);

    const songs = await Saavn.getSongs(
        playerSave.queue.map((id) => id.toString())
    );

    if (songs.success) {
        playerSave.queue = songs.data;
    }

    return (
        <ErrorBox data={songs}>
            <PlayerProvider data={playerSave}>
                <LibraryProvider data={librarySave}>{children}</LibraryProvider>
            </PlayerProvider>
        </ErrorBox>
    );
}
