"use client";

import { Media, MediaType } from "@/types/media";
import BlockMenu from "./menu";
import { Button } from "../ui/button";
import Lucide from "../lucide";
import React from "react";
import useLibrary from "@/contexts/library";
import useFetchAndPlay from "@/contexts/hooks/use-play";

export default function BlockCardMenu({
    item,
    type,
}: {
    item: Media;
    type: MediaType;
}) {
    const library = useLibrary();
    const fetchPlay = useFetchAndPlay();

    const menuItem = React.useMemo(
        () => [
            ...(type === "song" || type === "album"
                ? [
                      {
                          name: "Add to queue",
                          icon: Lucide.Plus,
                          onClick: () => {
                              if (type === "song") {
                                  fetchPlay.song(item.id, true);
                              } else if (type === "album") {
                                  fetchPlay.album(item, true);
                              }
                          },
                      },
                  ]
                : []),
            ...(type !== "artist"
                ? [
                      true,
                      {
                          name: "Add to playlist",
                          icon: Lucide.CirclePlus,
                          sub: [
                              {
                                  name: "New playlist",
                                  icon: Lucide.Plus,
                              },
                              (library.playlists || []).length > 0 && true,
                              ...library.playlists.map((playlist) => ({
                                  name: playlist.name,
                                  onClick: () =>
                                      library.addSongsToPlaylist(
                                          playlist.id,
                                          item.id
                                      ),
                              })),
                          ],
                      },
                  ]
                : []),
        ],
        [item, type, library, fetchPlay]
    );

    return (
        <BlockMenu items={menuItem} dropdown>
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full size-12"
            >
                <Lucide.Ellipsis />
            </Button>
        </BlockMenu>
    );
}
