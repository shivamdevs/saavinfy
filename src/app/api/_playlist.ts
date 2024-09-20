import db from "@/supabase/drizzle";

export default async function getPlaylistInfo(id: string) {
    try {
        const playlist = await db.query.Playlists.findFirst({
            where(fields, operators) {
                return operators.and(operators.eq(fields.id, id));
            },
            with: {
                songs: {
                    where(fields, operators) {
                        return operators.and(
                            operators.isNull(fields.removedAt)
                        );
                    },
                    orderBy(fields, operators) {
                        return operators.desc(fields.createdAt);
                    },
                },
            },
        });

        return {
            data: playlist,
        };
    } catch (error) {
        return {
            error: String(error),
        };
    }
}
