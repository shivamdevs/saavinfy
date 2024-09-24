import { ServerError } from "@/modules/server";
import SupabaseServerClient from "@/supabase/server";
import { NextRequest } from "next/server";

export async function validateAuth() {
    const supabase = SupabaseServerClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        Response.json(
            new ServerError(
                "Authentication error",
                { error, data },
                401,
                "validate/auth/error"
            ),
            { status: 401 }
        );

        return;
    }

    return data.user.id;
}

export async function validateSongs(req: NextRequest) {
    const data = await req.json();

    if (!data || !data.songs) {
        Response.json(
            new ServerError(
                "Data should be an object with a 'songs' array",
                { data },
                400,
                "validate/songs/no-data"
            ),
            { status: 400 }
        );

        return;
    }

    for (const song of data.songs) {
        if (typeof song !== "string" || song.length !== 8) {
            Response.json(
                new ServerError(
                    "Each song should be a string",
                    {
                        data,
                        song,
                        type: typeof song,
                    },
                    400,
                    "validate/songs/invalid-song"
                ),
                { status: 400 }
            );

            return;
        }
    }

    if (data.songs.length === 0) {
        Response.json(
            new ServerError(
                "Data should contain at least one song",
                { data },
                400,
                "validate/songs/no-songs"
            ),
            { status: 400 }
        );

        return;
    }

    return data.songs as string[];
}
