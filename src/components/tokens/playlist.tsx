import React from "react";
import { MediaSong } from "@/types/media";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import RoundButton from "./button";
import { Button } from "../ui/button";
import Lucide from "../lucide";

export default function AddToPlaylist({
    songs,
}: {
    songs?: MediaSong | MediaSong[];
}) {
    songs = Array.isArray(songs) ? songs : songs ? [songs] : [];

    const hasSongs = songs.length > 0;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <RoundButton size={40} className="p-0">
                    <Lucide.CirclePlus size={20} />
                </RoundButton>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {hasSongs ? "Add Songs to Playlist" : "Create Playlist"}
                    </DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button>
                            {hasSongs ? "Add to" : "Create"} Playlist
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
