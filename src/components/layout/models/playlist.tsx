"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLibrary from "@/contexts/library";
import React from "react";

export default function ModelPlaylist() {
    const library = useLibrary();

    return (
        <>
            <Dialog
                open={!!library.playlistEditor}
                onOpenChange={(open) => {
                    if (!open) {
                        library.setPlaylistEditor(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <h2 className="text-lg font-semibold">
                            {library?.playlistEditor?.new ? "Create" : "Edit"}{" "}
                            Playlist
                        </h2>
                    </DialogHeader>
                    <form>
                        <div className="grid grid-cols-4 items-center gap-4 my-6">
                            <Label htmlFor="playlist-name">Name</Label>
                            <Input
                                id="playlist-name"
                                value={library.playlistEditor?.edit?.name}
                                placeholder={
                                    library?.playlistEditor?.new
                                        ? "Playlist name..."
                                        : "Rename playlist..."
                                }
                                className="col-span-3"
                                autoFocus
                            />
                        </div>
                        <DialogFooter>
                            <Button>
                                {library?.playlistEditor?.new
                                    ? "Create"
                                    : "Update"}{" "}
                                Playlist
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
