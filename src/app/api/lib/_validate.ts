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
                error?.message || "User not found",
                error?.status || 401
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
                "Invalid data",
                "Data should be an object with a 'songs' array",
                400
            ),
            { status: 400 }
        );

        return;
    }

    for (const song of data.songs) {
        if (typeof song !== "string" || song.length !== 8) {
            Response.json(
                new ServerError(
                    "Invalid data",
                    "Each song should be a string",
                    400
                ),
                { status: 400 }
            );

            return;
        }
    }

    return data.songs as string[];
}
