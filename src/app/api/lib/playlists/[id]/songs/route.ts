import { ServerError, ServerResponse } from "@/modules/server";
import { NextRequest } from "next/server";
import { validateAuth, validateSongs } from "../../../_validate";
import db, { dbs } from "@/supabase/drizzle";
import { PageProps } from "@/types/args";
import { LibrarySong } from "@/types/library";
import { and, eq, inArray } from "drizzle-orm";

type PlaylistSong = LibrarySong & { removedAt: Date | null; uid: number };

export async function PUT(
    req: NextRequest,
    { params }: PageProps<{ id?: string }>
) {
    const playlist = params.id;

    if (!playlist) {
        return Response.json(
            new ServerError(
                "No playlist id provided",
                { params },
                400,
                "lib/playlists/songs/put/no-id"
            ),
            { status: 400 }
        );
    }

    const songs = await validateSongs(req);
    const user = await validateAuth();

    if (!user || !songs) {
        return;
    }

    let res;

    try {
        res = await db.transaction(async (tx) => {
            const pl = await tx.query.Playlists.findFirst({
                where(fields, operators) {
                    return operators.eq(fields.id, playlist);
                },
                with: {
                    songs: true,
                },
            });

            if (!pl) {
                return {
                    error: new ServerError(
                        "Playlist does not exist",
                        { playlist },
                        404,
                        "lib/playlists/songs/put/not-found"
                    ),
                };
            }

            if (pl.userId !== user) {
                return {
                    error: new ServerError(
                        "Playlist does not belong to user",
                        { playlist, user },
                        403,
                        "lib/playlists/songs/put/not-authorized"
                    ),
                };
            }

            if (pl.deletedAt) {
                return {
                    error: new ServerError(
                        "Playlist has been deleted",
                        { playlist },
                        410,
                        "lib/playlists/songs/put/deleted"
                    ),
                };
            }

            const allSongs: PlaylistSong[] = pl.songs;
            const toUpdate: string[] = [];
            const toInsert: string[] = [];

            for (const song of songs) {
                const x = allSongs.find((s) => s.song === song);
                if (x) {
                    if (x.removedAt) {
                        toUpdate.push(x.id);
                        x.removedAt = null;
                    }
                } else {
                    toInsert.push(song);
                }
            }

            if (toInsert.length > 0) {
                const ins = await tx
                    .insert(dbs.PlaylistSong)
                    .values(
                        songs.map((song) => ({ song, playlistId: playlist }))
                    )
                    .returning()
                    .execute();

                allSongs.push(...ins);
            }

            if (toUpdate.length > 0) {
                await tx
                    .update(dbs.PlaylistSong)
                    .set({
                        removedAt: null,
                    })
                    .where(
                        and(
                            inArray(dbs.PlaylistSong.id, toUpdate),
                            eq(dbs.PlaylistSong.playlistId, playlist)
                        )
                    )
                    .execute();
            }

            db.update(dbs.Playlist)
                .set({
                    modifiedAt: new Date(),
                })
                .where(eq(dbs.Playlist.id, playlist))
                .execute();

            return {
                songs: filterDistinct(
                    allSongs,
                    "song",
                    "createdAt",
                    "removedAt",
                    ["uid", "removedAt"]
                ),
                modifiedAt: new Date().toISOString(),
            };
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            new ServerError(
                "Database error",
                { error },
                500,
                "lib/playlists/songs/put/db-error"
            ),
            {
                status: 500,
            }
        );
    }

    if (res.error) {
        return Response.json(res.error, { status: res.error.status });
    }

    return Response.json(new ServerResponse(res, "Songs added to playlist"));
}

export async function DELETE(
    req: NextRequest,
    { params }: PageProps<{ id?: string }>
) {
    const playlist = params.id;

    if (!playlist) {
        return Response.json(
            new ServerError(
                "No playlist id provided",
                { params },
                400,
                "lib/playlists/songs/delete/no-id"
            ),
            { status: 400 }
        );
    }

    const songs = await validateSongs(req);
    const user = await validateAuth();

    if (!user || !songs) {
        return;
    }

    let res;

    try {
        res = await db.transaction(async (tx) => {
            const pl = await tx.query.Playlists.findFirst({
                where(fields, operators) {
                    return operators.eq(fields.id, playlist);
                },
                with: {
                    songs: true,
                },
            });

            if (!pl) {
                return {
                    error: new ServerError(
                        "Playlist does not exist",
                        { playlist },
                        404,
                        "lib/playlists/songs/delete/not-found"
                    ),
                };
            }

            if (pl.userId !== user) {
                return {
                    error: new ServerError(
                        "Playlist does not belong to user",
                        { playlist, user },
                        403,
                        "lib/playlists/songs/delete/not-authorized"
                    ),
                };
            }

            if (pl.deletedAt) {
                return {
                    error: new ServerError(
                        "Playlist has been deleted",
                        { playlist },
                        410,
                        "lib/playlists/songs/delete/deleted"
                    ),
                };
            }

            await tx
                .update(dbs.PlaylistSong)
                .set({
                    removedAt: new Date(),
                })
                .where(
                    and(
                        inArray(dbs.PlaylistSong.song, songs),
                        eq(dbs.PlaylistSong.playlistId, playlist)
                    )
                )
                .execute();

            await db
                .update(dbs.Playlist)
                .set({
                    modifiedAt: new Date(),
                })
                .where(eq(dbs.Playlist.id, playlist))
                .returning({
                    modifiedAt: dbs.Playlist.modifiedAt,
                })
                .execute();

            const allSongs = pl.songs.filter(
                (song) => !songs.includes(song.song)
            );

            return {
                songs: filterDistinct(
                    allSongs,
                    "song",
                    "createdAt",
                    "removedAt",
                    ["uid", "removedAt"]
                ),
                modifiedAt: new Date().toISOString(),
            };
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            new ServerError(
                "Database error",
                error,
                500,
                "lib/playlists/songs/delete/db-error"
            ),
            {
                status: 500,
            }
        );
    }

    if (res.error) {
        return Response.json(res.error, { status: res.error.status });
    }

    return Response.json(
        new ServerResponse(res, "Songs removed from playlist")
    );
}

function filterDistinct<T>(
    arr: T[],
    distinct: keyof T,
    sort?: keyof T,
    filter?: keyof T,
    remove?: (keyof T)[]
) {
    const seen = new Set();

    if (sort) {
        const sortKey = sort as string;
        if (sortKey.startsWith("-")) {
            const key = sortKey.slice(1) as keyof T;
            arr = arr.sort((a, b) => (b[key] as any) - (a[key] as any));
        } else {
            arr = arr.sort((a, b) => (b[sort] as any) - (a[sort] as any));
        }
    }

    arr = arr.filter((item) => {
        const val = item[distinct];
        if (seen.has(val)) {
            return false;
        }
        seen.add(val);

        return true;
    });

    if (filter) {
        arr = arr.filter((item) => !item[filter]);
    }

    if (remove) {
        arr = arr.map((item) => {
            for (const key of remove) {
                delete item[key];
            }

            return item;
        });
    }

    return arr;
}
