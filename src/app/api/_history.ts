import db from "@/supabase/drizzle";
import { sql } from "drizzle-orm";
import postgres from "postgres";

export default async function historyTrending() {
    const query = sql`
        SELECT song as id, sum(frequency) as total FROM history WHERE created_at > now() - interval '1 week'
        GROUP BY song, created_at ORDER BY total DESC LIMIT 3
    `;

    const res: postgres.RowList<
        {
            id: string;
            total: number;
        }[]
    > = await db.execute(query);

    return res.map((r) => r.id);
}
