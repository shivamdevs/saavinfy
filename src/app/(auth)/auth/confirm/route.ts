import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { redirect } from "next/navigation";
import SupabaseServerClient from "@/supabase/server";
import db, { dbs } from "@/supabase/drizzle";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const tokenHash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;

    if (tokenHash && type) {
        const supabase = SupabaseServerClient();

        const { error } = await supabase.auth.verifyOtp({
            type,
            // eslint-disable-next-line camelcase
            token_hash: tokenHash,
        });

        const { data } = await supabase.auth.getUser();

        if (data.user) {
            try {
                await db.transaction(async (trx) => {
                    const favPlaylist = await trx.query.Playlists.findFirst({
                        where(fields, operators) {
                            return operators.and(
                                operators.eq(fields.userId, data.user.id),
                                operators.eq(fields.isFavorite, true)
                            );
                        },
                    });

                    if (!favPlaylist) {
                        await trx.insert(dbs.Playlist).values({
                            userId: data.user.id,
                            name: "Favorites",
                            isFavorite: true,
                        });
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
        if (!error) {
            return redirect("/auth/success");
        }
    }

    redirect("/auth/error");
}
