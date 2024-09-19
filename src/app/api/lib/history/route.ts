import { ServerError, ServerResponse } from "@/modules/server";
import { NextRequest } from "next/server";
import { validateAuth, validateSongs } from "../_validate";
import db, { dbs } from "@/supabase/drizzle";
import { inArray } from "drizzle-orm";

export async function PUT(req: NextRequest) {
    const songs = await validateSongs(req);
    const user = await validateAuth();

    if (!user || !songs) {
        return;
    }

    try {
        await db.transaction(async (tx) => {
            const hs = await tx.query.History.findMany({
                where: (fields, operators) => {
                    return operators.and(
                        operators.eq(fields.userId, user),
                        operators.isNull(fields.removedAt)
                    );
                },
            });

            const toInsert = songs.filter(
                (song) => !hs.some((h) => h.song === song)
            );

            const toUpdate = songs
                .filter((song) => hs.some((h) => h.song === song))
                .map((song) => hs.find((h) => h.song === song)?.id || "")
                .filter((id) => !!id);

            if (toInsert.length) {
                await tx.insert(dbs.History).values(
                    toInsert.map((song) => ({
                        userId: user,
                        song,
                    }))
                );
            }

            if (toUpdate.length) {
                await tx
                    .update(dbs.History)
                    .set({
                        lastPlayedAt: new Date(),
                        removedAt: null,
                    })
                    .where(inArray(dbs.History.id, toUpdate));
            }
        });
    } catch (error) {
        return Response.json(
            new ServerError(
                "Database error",
                { error },
                500,
                "lib/history/put/db-error"
            ),
            { status: 500 }
        );
    }

    return Response.json(new ServerResponse("OK"), { status: 200 });
}
